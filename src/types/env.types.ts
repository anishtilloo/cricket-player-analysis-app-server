export type env = {
    databaseUrl: string | undefined,
    env: string | undefined,
    port: string | undefined,
    jwtAccessSecret?: string,
    accessTokenExpiresIn?: string,
    jwtRefreshSecret?: string,
    refreshTokenExpiresIn?: string,
}