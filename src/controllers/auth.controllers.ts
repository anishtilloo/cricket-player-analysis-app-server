import httpStatus from "http-status";
import { Request, Response } from "express";

import authServices from "../services/auth.services";
import tokenServices from "../services/token.services";
import { getUserByEmail } from "../services/users/user.get.services";
import createUser from "../services/users/user.post.services";

import exclude from "../utils/exclude";
import { devEnvironmentVariable } from "../utils/envConstants";
import ApiError from "../utils/ApiError";
import { convertBigIntToString } from "../utils/common";

export async function addUser(req: Request, res: Response) {
  try {
    const reqBody = req.body;
    const existingUserWithSameEmail = await getUserByEmail(reqBody.email);
    
    if (existingUserWithSameEmail) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    
    const user = await createUser(reqBody);

    // remove password, createdAt and updatedAt are removed from the response in below function
    const userWithoutPassword = exclude(user, [
      "password",
      "createdAt",
      "updatedAt",
    ]);

    const tokens = await tokenServices.generateAuthTokens(user);

    res.cookie('access_token', tokens.access).status(httpStatus.CREATED).json({
      success: true,
      data: convertBigIntToString(userWithoutPassword),
      refreshToken: tokens.refresh,
      message: "The user is added and the auth tokens are created",
      error: null,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      user: null,
      tokens: null,
      message:
        `Something is wrong -> ${error}`,
      error: error,
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await authServices.loginUserWithEmailAndPassword(
      email,
      password
    );

    const tokens = await tokenServices.generateAuthTokens(user);
    
    res.status(httpStatus.CREATED).json({
      success: true,
      data: user,
      tokens: tokens,
      message: "The user is authorized",
      error: null,
    });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      user: null,
      tokens: null,
      message: `Something is wrong, the user is not authorized -> ${error}`,
      error: null,
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    await authServices.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).json({
      success: true,
      message: "The user has been successfully logged out",
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message:
        `Something went wrong, -> ${error}`,
    });
  }
}

export async function refreshTokens(req: Request, res: Response) {
  try {
    const tokens = await authServices.refreshAuth(req.body.refreshToken as string, devEnvironmentVariable.jwtRefreshSecret);
    res.status(httpStatus.CREATED).json({
      success: true,
      tokens: tokens,
      message: "The refresh token is sent",
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: `Something went wrong, ${error}`,
    });
  }
}

// export async function forgotPassword(req: Request, res: Response) {
//   try {
//     const resetPasswordToken = await tokenServices.generateResetPasswordToken(
//       req.body.email
//     );
//     await emailServices.sendResetPasswordEmail(req.body.email, resetPasswordToken);
//     res.status(200).json({
//       success: true,
//       message: "The token and the email is sent",
//     });
//   } catch (error) {
//       res.status(httpStatus.BAD_REQUEST).json({
//         success: false,
//         message: "The token and the email not sent",
//       });
//       throw new ApiError(
//         httpStatus.BAD_REQUEST,
//         "Something went wrong, the user is not added and tokens and not generated"
//       );
//     }
// }

// export async function resetPassword(req: Request, res: Response) {
//   try {
//     await authServices.resetPassword(
//       req.query.token as string,
//       req.body.password,
//       devEnvironmentVariable.jwtAccessSecret,
//     );
//     res.status(httpStatus.CREATED).json({
//       success: true,
//       message: "The reset password is sent",
//     });
//   } catch (error) {
//     res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message: `Something went wrong -> ${error}`,
//     });
//   }
// }

// const sendVerificationEmail = catchAsync(async (req, res) => {
//   const user = req.user as User;
//   const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
//   await emailService.sendVerificationEmail(user.email, verifyEmailToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const verifyEmail = catchAsync(async (req, res) => {
//   await authService.verifyEmail(req.query.token as string);
//   res.status(httpStatus.NO_CONTENT).send();
// });
