import { error } from "console";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import tokenServices from "../services/token.services";
import { getUserById } from "../services/users/user.get.services";
import jwt, { Secret } from "jsonwebtoken";

const auth = (secret: string | undefined) => (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.get('Authorization');
    try {
        if (authHeader === secret) {
          next();
        } 
    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: "Authentication of the token from the user failed",
            errors: error,
        });
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "Authentication of the token from the user failed"
        );
    }
}



// export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Authentication required",
//       data: null,
//       error: error,
//     });
//   }
  
//   try {
//     const decodedToken = await tokenServices.verifyToken(token, "ACCESS");
//     const user = await getUserById(decodedToken.id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//         data: null,
//         error: error,
//       });
//     }

//     // req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Invalid token",
//       error: error,
//     });
//   }
// };


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }
  const accessSecret: Secret = process.env.JWT_ACCESS_SECRET as unknown as Secret;

  console.log(accessSecret);
  
  try {
    const payload = jwt.verify(token, accessSecret);
    const userId = String(payload.sub);
    const user = await getUserById(userId);
    console.log(user);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error,
    });
  }
};
