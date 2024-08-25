export interface User extends Record<string, any> {
  encryptedSeed: string;
  password: string;
  salt: string;
}
