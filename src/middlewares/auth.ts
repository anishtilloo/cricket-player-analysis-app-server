import { error } from "console";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

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
