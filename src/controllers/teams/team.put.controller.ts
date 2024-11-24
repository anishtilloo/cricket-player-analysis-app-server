import { Request, Response } from "express";
import { updateUserById } from "../../services/users/user.put.services";
import httpStatus from "http-status";

export async function updateTeam(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const userId = String(id);
    const userBody = req.body;
    const user = await updateUserById(userId, userBody);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong, user update unsuccessful",
      error: error,
    });
  }
}
