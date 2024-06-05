import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

import { getUserById } from "../services/users/user.get.services";
import httpStatus from "http-status";

export function authenticateAndCheckRole (req: Request, res: Response, next: NextFunction) {
  if (req.user?.role === 'ADMIN') {
    next();
  } else {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Unauthorized to Access this resource`,
    })
    return;
  } 
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }
  try {
    const user = await chekcAuth(token);
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: `User Not Found`,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Something went wrong -> ${error}`,
      error: error,
    });
  }
};

async function chekcAuth(token: string) {
  const accessSecret = process.env.JWT_ACCESS_SECRET as unknown as Secret;
  const payload = jwt.verify(token, accessSecret);
    const userId = String(payload.sub);
    const user = await getUserById(userId);
    return user;
}
