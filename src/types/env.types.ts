import { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";

export type env = {
  databaseUrl: string | undefined;
  env: string | undefined;
  port: string | undefined;
  jwtAccessSecret: any;
  accessTokenExpiresIn?: string;
  jwtRefreshSecret: any;
  refreshTokenExpiresIn?: string;
  jwtResetPasswordExpirationMinutes: any;
  jwtVerifyEmailExpirationMinutes: any,
};
