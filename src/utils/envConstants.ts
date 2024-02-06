import { env } from "../types/env.types";

export const devEnvironmentVariable: env = {
  databaseUrl: process.env.DATABASE_URL,
  env: process.env.ENV,
  port: process.env.PORT,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  jwtResetPasswordExpirationMinutes:
    process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  jwtVerifyEmailExpirationMinutes:
    process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
};

export const prodEnviromentVariables: env = {
  databaseUrl: process.env.DATABASE_URL,
  env: process.env.ENV,
  port: process.env.PORT,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  jwtResetPasswordExpirationMinutes:
    process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  jwtVerifyEmailExpirationMinutes:
    process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
};
