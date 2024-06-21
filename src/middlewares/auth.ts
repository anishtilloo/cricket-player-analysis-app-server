import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { RoleEnumType } from "@prisma/client";
import httpStatus from "http-status";

import { getUserById } from "../services/users/user.get.services";
import tokenServices from "../services/token.services";

export function authenticateAndCheckRole(role: Array<RoleEnumType>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (role.includes(req.user?.role)) {
      next();
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: `Unauthorized to Access this resource`,
      })
      return;
    } 
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
  const userId = await tokenServices.verifyToken<string>(token, accessSecret);
  const user = await getUserById(userId);
  return user;
}
