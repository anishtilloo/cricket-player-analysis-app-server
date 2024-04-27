import httpStatus from "http-status";
import authServices from "../../services/auth.services";
import tokenServices from "../../services/token.services";
import exclude from "../../utils/exclude";
import { Request, Response } from "express";
import createUser from "../../services/users/user.post.services";
import ApiError from "../../utils/ApiError";

export async function addUser(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);

    const userWithoutPassword = exclude(user, [
      "password",
      "createdAt",
      "updatedAt",
    ]);
    const tokens = await tokenServices.generateAuthTokens(user);

    res.status(httpStatus.CREATED).json({
      success: true,
      data: userWithoutPassword,
      tokens: tokens,
      message: "The user is added and the auth tokens are created",
      error: null,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      user: null,
      tokens: null,
      message:
        "Something is wrong, the user is not added and tokens and not generated",
      error: error,
    });
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Something went wrong, the user is not added and tokens and not generated"
    );
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
      message: "The user is authorised",
      error: null,
    });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      user: null,
      tokens: null,
      message: "Something is wrong, the user is not authorised",
      error: null,
    });
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Something went wrong, the user is not authorised"
    );
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
        "Something went wrong, the user logging out has been unsuccessful",
    });
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Something went wrong, the user logging out has been unsuccessful"
    );
  }
}

export async function refreshTokens(req: Request, res: Response) {
  try {
    const tokens = await authServices.refreshAuth(req.body.refreshToken);
    res.status(httpStatus.CREATED).json({
      success: true,
      tokens: tokens,
      message: "The refresh token is sent",
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong, refresh token not sent",
    });
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Something went wrong, the user is not added and tokens and not generated"
    );
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

export async function resetPassword(req: Request, res: Response) {
  try {
    await authServices.resetPassword(
      req.query.token as string,
      req.body.password
    );
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "The reset password is sent",
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong, the request is not sent",
    });
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Something went wrong, the user is not added and tokens and not generated"
    );
  }
}

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

// export default {
//   // register,
//   //   login,
//   //   logout,
//   //   refreshTokens,
//   //   forgotPassword,
//   //   resetPassword,
//   //   sendVerificationEmail,
//   //   verifyEmail,
// };
