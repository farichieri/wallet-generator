'use server';

import crypto from 'crypto';

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
  try {
    // Decode the base64 encoded string
    const base64Decoded = Buffer.from(
      decodeURIComponent(encryptedSeed),
      'base64',
    ).toString('utf-8');

    // Split the decoded string into IV and encrypted data using ':' as the separator
    const [ivHex, encryptedDataHex] = base64Decoded.split(':');

    // Convert the IV and encrypted data from hex to binary format
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedData = Buffer.from(encryptedDataHex, 'hex');

    // Generate the decryption key using the same salt, password, and parameters
    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');

    // Initialize the decryption cipher with the generated key and IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    // Decrypt the data
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Convert the decrypted binary data to a UTF-8 encoded string
    const decryptedStr = decrypted.toString('utf-8');

    // Split the decrypted string into the seed and derivation paths
    const [seedStr, derivationPathsStr] = decryptedStr.split('||');
    const derivationPaths = JSON.parse(derivationPathsStr);

    return {
      seedStr,
      derivationPaths,
    };
  } catch (error) {
    console.error('Error decrypting seed', error);
    throw new Error('Error decrypting seed');
  }
}
