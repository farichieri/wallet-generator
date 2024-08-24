'use server';

import crypto from 'crypto';

import { encode as base64Encode } from 'base-64';

interface Props {
  seed: string;
  password: string;
  derivationPaths: string[];
}

export async function encryptSeed({
  seed,
  password,
  derivationPaths,
}: Props): Promise<{
  encryptedSeed: string;
  salt: string;
}> {
  if (!seed || !password || !derivationPaths) {
    throw new Error('Missing required fields');
  }

  const derivationPathsStr = JSON.stringify(derivationPaths);
  console.log({ derivationPathsStr });

  const salt = crypto.randomBytes(16).toString('hex');
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  const combinedData = `${seed}||${derivationPathsStr}`;
  let encrypted = cipher.update(Buffer.from(combinedData, 'utf-8'));
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const base64Encoded = base64Encode(
    iv.toString('hex') + ':' + encrypted.toString('hex'),
  );

  const urlEncodedEncryptedSeed = encodeURIComponent(base64Encoded);
  return {
    encryptedSeed: urlEncodedEncryptedSeed,
    salt,
  };
}
