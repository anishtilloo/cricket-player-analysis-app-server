import { Request, Response } from "express";
import ApiError from "../../utils/ApiError";
import httpStatus from "http-status";

import { deleteUserById } from "../../services/users/user.delete.services";
import { getUserById } from "../../services/users/user.get.services";

export async function deleteOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const userId = String(id);
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    await deleteUserById(userId);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message:`Something went wrong -> ${error}`,
      error: error,
    });
  }
}
