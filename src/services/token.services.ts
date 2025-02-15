import jwt, { Secret } from "jsonwebtoken";
import moment, { Moment } from "moment";
import httpStatus from "http-status";
import { Token, TokenType } from "@prisma/client";

import prisma from "../utils/prisma";
import ApiError from "../utils/ApiError";
import { devEnvironmentVariable } from "../utils/envConstants";
import { AuthTokensResponse } from "../types/response";
import { JwtPayload } from "../types/jwt.types";
import { getUserByEmail } from "./users/user.get.services";

const generateToken = (
  userId: string,
  expires: Moment,
  type: TokenType,
  secret: Secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (
  token: string,
  userId: string,
  expires: Moment,
  type: TokenType,
  blacklisted = false
): Promise<Token> => {
  const createdToken = prisma.token.create({
    data: {
      token,
      userId: BigInt(userId),
      expires: expires.toDate(),
      type,
      blacklisted,
    },
  });
  return createdToken;
};

const verifyToken = async <T>(token: string, secret: Secret) : Promise<T> => {
  const payload = jwt.verify(token, secret) as unknown as JwtPayload;
  console.log("payload", payload);
  
  const userId = String(payload.sub);
  console.log("userId", userId);

  if (payload.type === "REFRESH") {
    const tokenData = await prisma.token.findFirst({
      where: { 
        token, 
        type: payload.type, 
        userId: BigInt(userId), 
        blacklisted: false 
      },
    });
    console.log("tokenData", tokenData);
    
    if (!tokenData) {
      throw new Error("Token not found");
    }
    return tokenData as unknown as T;
  }
  return userId as unknown as T;
};

const generateAuthTokens = async (user: any): Promise<AuthTokensResponse> => {
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);
  return {
    access: accessToken,
    refresh: refreshToken
  };
};

const generateAccessToken = async (user: any) => {

  const accessTokenExpires = moment().add('120',
    "minutes"
  );
  const accessToken = generateToken(
    String(user.id),
    accessTokenExpires,
    TokenType.ACCESS,
    devEnvironmentVariable.jwtAccessSecret as unknown as Secret
  );

  return {
      token: accessToken,
      expires: accessTokenExpires.toLocaleString() as unknown as string,
  };
}

const generateRefreshToken = async (user: any) => {
  const refreshTokenExpires = moment().add('30',
    "days"
  );
  const refreshToken = generateToken(
    String(user.id),
    refreshTokenExpires,
    TokenType.REFRESH,
    devEnvironmentVariable.jwtRefreshSecret
  );
  await saveToken(
    refreshToken,
    String(user.id),
    refreshTokenExpires,
    TokenType.REFRESH
  );
  return {
      token: refreshToken,
      expires: refreshTokenExpires.toLocaleString() as unknown as string,
  };
}

const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
  }
  const expires = moment().add(
    devEnvironmentVariable.jwtResetPasswordExpirationMinutes,
    "minutes"
  );
  const resetPasswordToken = generateToken(
    String(user.id),
    expires,
    TokenType.RESET_PASSWORD,
    devEnvironmentVariable.jwtAccessSecret,
  );
  await saveToken(
    resetPasswordToken,
    String(user.id),
    expires,
    TokenType.RESET_PASSWORD
  );
  return resetPasswordToken;
};

const generateVerifyEmailToken = async (user: {
  id: string;
}): Promise<string> => {
  const expires = moment().add(
    devEnvironmentVariable.jwtVerifyEmailExpirationMinutes,
    "minutes"
  );
  const verifyEmailToken = generateToken(
    String(user.id),
    expires,
    TokenType.VERIFY_EMAIL,
    devEnvironmentVariable.jwtAccessSecret,
  );
  await saveToken(
    verifyEmailToken,
    String(user.id),
    expires,
    TokenType.VERIFY_EMAIL
  );
  return verifyEmailToken;
};

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
