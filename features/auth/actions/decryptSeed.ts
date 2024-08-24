'use server';

import crypto from 'crypto';

interface DecryptionProps {
  encryptedSeed: string;
  salt: string;
  password: string;
}

interface DecryptionProps {
  encryptedSeed: string;
  salt: string;
  password: string;
}

export async function decryptSeed({
  encryptedSeed,
  salt,
  password,
}: DecryptionProps): Promise<{
  seedStr: string;
  derivationPaths: string[];
}> {
  // Step 2: Base64 decode the string
  const base64Decoded = Buffer.from(
    decodeURIComponent(encryptedSeed),
    'base64',
  ).toString('utf-8');

  // The IV and encrypted data are separated by ':'
  const [ivHex, encryptedDataHex] = base64Decoded.split(':');

  // Step 3: Convert the IV and encrypted data from hex to binary format
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedData = Buffer.from(encryptedDataHex, 'hex');

  // Step 4: Use the same salt and password to generate the decryption key
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');

  // Step 5: Initialize the decryption cipher with the key and IV
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // Step 6: Decrypt the data
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // Convert decrypted data to string
  const decryptedStr = decrypted.toString('utf-8');

  // Step 7: Split the combined string to separate the seed and derivation paths
  const [seedStr, derivationPathsStr] = decryptedStr.split('||');
  const derivationPaths = JSON.parse(derivationPathsStr);

  return {
    seedStr,
    derivationPaths,
  };
}
