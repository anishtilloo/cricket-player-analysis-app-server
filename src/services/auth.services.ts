import httpStatus from "http-status";
import { Token, TokenType, User } from "@prisma/client";
import { Secret } from "jsonwebtoken";

import tokenService from "./token.services";
import { AuthTokensResponse } from "../types/response";
import { getUserByEmail, getUserById } from "./users/user.get.services";
import { updateUserById } from "./users/user.put.services";
import prisma from "../utils/prisma"; 
import ApiError from "../utils/ApiError";
import exclude from "../utils/exclude";
import { encryptPassword, isPasswordMatch } from "../utils/encryption";

const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Omit<User, "password">> => {
  const user = await getUserByEmail(email);
  if (!user || !(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return exclude(user, ["password"]);
};

const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenData = await prisma.token.findFirst({
    where: {
      token: refreshToken,
      type: TokenType.REFRESH,
      blacklisted: false,
    },
  });
  if (!refreshTokenData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await prisma.token.delete({ where: { id: refreshTokenData.id } });
};

const refreshAuth = async (
  refreshToken: string,
  secret: Secret
): Promise<AuthTokensResponse> => {
  try {
    const userData = await tokenService.verifyToken<Token>(
      refreshToken,
      secret,
    );

    const { userId } = userData;
    await prisma.token.delete({ where: { id: userData.id } });
    return tokenService.generateAuthTokens({ id: String(userId) });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Please authenticate -> ${error}`);
  }
};

// const resetPassword = async (
//   resetPasswordToken: string,
//   newPassword: string,
//   secret: Secret,
// ): Promise<void> => {
//   try {
//     const resetPasswordTokenData = await tokenService.verifyToken(
//       resetPasswordToken,
//       secret,
//     );
//     const user = await getUserById(resetPasswordTokenData.userId);
//     if (!user) {
//       throw new Error();
//     }
//     const encryptedPassword = await encryptPassword(newPassword);
//     await updateUserById(user.id, { password: encryptedPassword });
//     await prisma.token.deleteMany({
//       where: { userId: user.id, type: TokenType.RESET_PASSWORD },
//     });
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, `Password reset failed -> ${error}`);
//   }
// };

// const verifyEmail = async (verifyEmailToken: string, secret: Secret): Promise<void> => {
//   try {
//     const verifyEmailTokenData = await tokenService.verifyToken(
//       verifyEmailToken,
//       secret,
//     );
//     await prisma.token.deleteMany({
//       where: {
//         userId: verifyEmailTokenData.userId,
//         type: TokenType.VERIFY_EMAIL,
//       },
//     });
//     await updateUserById(verifyEmailTokenData.userId, {
//       isEmailVerified: true,
//     });
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, `Email verification failed -> ${error}`);
//   }
// };

export default {
  loginUserWithEmailAndPassword,
  isPasswordMatch,
  encryptPassword,
  logout,
  refreshAuth,
  // resetPassword,
  // verifyEmail,
};
