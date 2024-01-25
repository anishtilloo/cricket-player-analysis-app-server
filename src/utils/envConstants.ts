import { env } from "../types/env.types"

export const devEnvironmentVariable : env = {
    databaseUrl: process.env.DATABASE_URL,
    env: process.env.ENV,
    port: process.env.PORT,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
}

export const prodEnviromentVariables : env = {
    databaseUrl: process.env.DATABASE_URL,
    env: process.env.ENV,
    port: process.env.PORT,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
}