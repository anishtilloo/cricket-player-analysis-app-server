import { Request, Response, NextFunction } from "express";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import type { RoleEnumType } from "@prisma/client";

import { getUserById } from "../services/users/user.get.services";
import tokenServices from "../services/token.services";
import { ROLES } from "../config/auth.config";
import type { RolesWithPermissions, Permissions } from "../types/auth.types";


export function hasPermission<Resource extends keyof Permissions>(
    // user: User,
    resource: Resource,
    action: Permissions[Resource]["action"],
    data?: Permissions[Resource]["dataType"]
) {
  return (req: Request, res: Response, next: NextFunction) => {
      const permission = (ROLES as RolesWithPermissions)[req.user!.role][resource]?.[action];

      if (typeof permission === "boolean") {
        return permission && next();
      } else if (permission && data != null && permission(req.user!, data)) {
        return permission(req.user!, data) && next();
      } else {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: `You do not have the Permission to access this Resource`,
        })
      return;
    } 
    }
}

export function authenticateAndCheckRole(role: Array<RoleEnumType>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && role.includes(req.user?.role)) {
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
    const user = await checkAuth(token);

    if (!user) {
      res.status(404).json({
        success: false,
        message: `User Not Found`,
      });
    }
    req.user = user ? user : undefined;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Something went wrong -> ${error}`,
      error: error,
    });
  }
};

async function checkAuth(token: string) {
  const accessSecret = process.env.JWT_ACCESS_SECRET as unknown as Secret;
  const userId = await tokenServices.verifyToken<string>(token, accessSecret);
  const user = await getUserById(userId);
  return user;
}

