export type env = {
  databaseUrl: string | undefined;
  env: string | undefined;
  port: string | undefined;
  jwtAccessSecret?: any;
  accessTokenExpiresIn?: string;
  jwtRefreshSecret?: string;
  refreshTokenExpiresIn?: string;
  jwtResetPasswordExpirationMinutes: any;
  jwtVerifyEmailExpirationMinutes: any,
};
