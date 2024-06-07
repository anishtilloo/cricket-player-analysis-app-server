import { Request, Response } from "express";
import { queryUsers, getUserByEmail, getUserById } from "../../services/users/user.get.services";
import ApiError from "../../utils/ApiError";
import httpStatus from "http-status";

// GET : Request
// get one user by id
export async function getUserUsingId(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const userId = String(id);
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "No User Found")
    }
    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      data: user,
    });

  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      success: true,
      message: `Something went wrong -> ${error}`,
      error: error,
    });
  }
}

// GET request
// get queried users
export async function queryUser(req: Request, res: Response) {
  try {
    const options = req.query;
    const { filter } = req.body;
    const queriedUsers = await queryUsers(
        filter,
        options
    )
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Users Fetched Successfully",
      data: queriedUsers,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: `Something went wrong -> ${error}`,
      error: error,
    });
  }
}

// GET : Request
// get one user by email
export async function getUserUsingEmail(req: Request, res: Response) {
  try {
    const email = req.body.email;
    // const userId = String(email);
    const user = await getUserByEmail(email);
    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Something went wrong, the user does not exist in the db"
      );
    } 
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "User Fetched Successfully",
      data: user,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      success: true,
      message: `Something went wrong -> ${error}`,
      error: error,
    });
    
}
}
