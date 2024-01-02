import prisma from "../../utils/prisma";
import hashToken from "../../utils/hashToken";


// used when we create a refresh token.
export async function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: {jti: string; refreshToken: string; userId: string}) {
    return await prisma.refreshToken.create({
      data: {
        id: jti,
        hashedToken: hashToken(refreshToken),
        userId
      },
    });
}

// used to check if the token sent by the client is in the database.
export async function findRefreshTokenById(id: string) {
    return await prisma.refreshToken.findUnique({
      where: {
        id,
      },
    });
  }
  
  // soft delete tokens after usage.
export async function deleteRefreshToken(id: string) {
    return await prisma.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true
      }
    });
  }
  
  export async function revokeTokens(userId: string) {
    return await prisma.refreshToken.updateMany({
      where: {
        userId
      },
      data: {
        revoked: true
      }
    });
  }