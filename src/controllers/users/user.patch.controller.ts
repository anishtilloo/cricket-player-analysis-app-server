import { Request, Response } from "express";
import httpStatus from "http-status";
import { getUserById } from "../../services/users/user.get.services";
import { assignRoleToUser } from "../../services/users/user.put.services";
import ApiError from "../../utils/ApiError";

// PATCH request
// updated the role of the user
export async function assignRole(req: Request, res: Response) {
    try {
        const userId = req.body?.userId;
        const role = req.body?.role;
        const userExist = await getUserById(userId);
        if (!userExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
        }
        if (userExist.role === role) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User already has the same role");
        }
        const updatedUser = await assignRoleToUser(role, userExist);

        res.status(httpStatus.OK).json({
            success: true,
            message: "User Added Successfully",
            data: updatedUser,
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: `Something went wrong -> ${error}`,
            error: error,
        });
    }
  }