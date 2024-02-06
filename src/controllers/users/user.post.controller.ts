import { Request, Response } from "express";
import createUserService from "../../services/users/user.post.services";
import httpStatus from "http-status";

// POST request
// create new team in the DB
export async function addUser(req: Request, res: Response) {
  try {
    const user = req.body;
    const createdUser = await createUserService(user);
    res.status(httpStatus.OK).json({
      success: true,
      message: "User Added Successfully",
      data: createdUser,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
}
