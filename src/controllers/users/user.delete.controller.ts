import { Request, Response } from "express";
import { deleteUserById } from "../../services/users/user.delete.services";
import httpStatus from "http-status";

export async function deleteOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const userId = String(id);
    await deleteUserById(userId);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
}
