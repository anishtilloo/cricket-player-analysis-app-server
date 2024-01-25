import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../types/env.types';

// ? Sign Access or Refresh Token
export const signJwt = (
  payload: Object,
  keyName: string,
  options: SignOptions
) => {
  const privateKey = Buffer.from(
    keyName,
    'base64'
  ).toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

// ? Verify Access or Refresh Token
// ? Verify Access or Refresh Token
export const verifyJwt = <T>(
    token: string,
    keyName: string,
  ): T | null => {
    try {
      const publicKey = Buffer.from(
        keyName,
        'base64'
      ).toString('ascii');
      const decoded = jwt.verify(token, publicKey) as T;
      return decoded;
    } catch (error) {
        console.error("Returned Error during decoding the jwt token, either the token is not valid or tampered with >> ", error);
        return null;
    }
  };
  
