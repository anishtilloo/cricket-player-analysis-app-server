import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import httpStatus from "http-status";
import { devEnvironmentVariable } from "../utils/envConstants";
import ApiError from "../utils/ApiError";
import { Token, TokenType } from "@prisma/client";
import prisma from "../utils/prisma";
import { AuthTokensResponse } from "../types/response";
import { getUserByEmail } from "./users/user.get.services";

const generateToken = (
  userId: string,
  expires: Moment,
  type: TokenType,
  secret: any = devEnvironmentVariable.jwtAccessSecret
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
      userId: String(userId),
      expires: expires.toDate(),
      type,
      blacklisted,
    },
  });
  return createdToken;
};

const verifyToken = async (token: string, type: TokenType): Promise<Token> => {
  const payload = jwt.verify(token, devEnvironmentVariable.jwtAccessSecret);
  const userId = String(payload.sub);
  const tokenData = await prisma.token.findFirst({
    where: { token, type, userId, blacklisted: false },
  });
  if (!tokenData) {
    throw new Error("Token not found");
  }
  return tokenData;
};

const generateAuthTokens = async (user: any): Promise<AuthTokensResponse> => {
  const accessTokenExpires = moment().add(
    devEnvironmentVariable.accessTokenExpiresIn,
    "minutes"
  );
  const accessToken = generateToken(
    String(user.id),
    accessTokenExpires,
    TokenType.ACCESS
  );

  const refreshTokenExpires = moment().add(
    devEnvironmentVariable.refreshTokenExpiresIn,
    "days"
  );
  const refreshToken = generateToken(
    String(user.id),
    refreshTokenExpires,
    TokenType.REFRESH
  );
  await saveToken(
    refreshToken,
    String(user.id),
    refreshTokenExpires,
    TokenType.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

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
    user.id,
    expires,
    TokenType.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
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
    TokenType.VERIFY_EMAIL
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
