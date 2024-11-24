import { Router } from "express";

import { validate } from "../middlewares/validate";
import { authenticate, authenticateAndCheckRole } from "../middlewares/auth";
import {
  addUser,
  login,
  logout,
  refreshTokens,
  // resetPassword,
} from "../controllers/auth.controllers";
import {
  addUserSchema,
  assignRoleSchema,
  loginSchema,
  logoutSchema,
  refreshTokensSchema,
  // resetPasswordSchema,
} from "../schemas/auth.schema";
import { assignRole } from "../controllers/users/user.patch.controller";

const authRouter = Router();

authRouter.post(
  "/register", 
  validate(addUserSchema), 
  addUser
);
authRouter.post(
  "/login", 
  validate(loginSchema), 
  login
);
authRouter.post(
  "/logout", 
  validate(logoutSchema), 
  logout
);

authRouter.post(
  "/refresh-tokens",
  validate(refreshTokensSchema),
  refreshTokens
);

// authRouter.post(
//   "/reset-password",
//   authenticate,
//   validate(resetPasswordSchema),
//   resetPassword
// );

authRouter.patch(
    "/assign-role", 
    authenticate, 
    authenticateAndCheckRole(['ADMIN']), 
    validate(assignRoleSchema),
    assignRole
);

// authRouter.post(
//   "/forgot-password",
//   validate(forgotPasswordSchema),
//   forgotPassword
// ); 

export default authRouter;
