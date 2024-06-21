import { TokenType } from "@prisma/client"

export type JwtPayload = {  
    sub: string,
    iat: number,
    exp: number,
    type: TokenType
}