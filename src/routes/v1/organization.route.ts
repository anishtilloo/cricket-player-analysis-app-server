import { Router } from "express";

import { validate } from "../../middlewares/validate";
import { authenticate, authenticateAndCheckRole } from "../../middlewares/auth";
import {
  addUser,
  login,
  logout,
  refreshTokens,
  // resetPassword,
} from "../../controllers/auth.controllers";
import {
  addUserSchema,
  assignRoleSchema,
  loginSchema,
  logoutSchema,
  refreshTokensSchema,
  // resetPasswordSchema,
} from "../../schemas/auth.schema";
import { assignRole } from "../../controllers/users/user.patch.controller";
import { RoleEnumType } from "@prisma/client";
import { hasPermission } from "../../middlewares/auth";

const orgRouter = Router();

orgRouter.post(
  "/create-org", 
  validate(addUserSchema), 
  addUser
);
orgRouter.post(
  "/login", 
  validate(loginSchema), 
  login
);
orgRouter.post(
  "/logout", 
  validate(logoutSchema), 
  logout
);

orgRouter.post(
  "/refresh-tokens",
  validate(refreshTokensSchema),
  refreshTokens
);

// orgRouter.post(
//   "/reset-password",
//   authenticate,
//   validate(resetPasswordSchema),
//   resetPassword
// );

orgRouter.patch(
    "/assign-role", 
    authenticate,
    authenticateAndCheckRole([RoleEnumType.ADMIN]),
    hasPermission("assign_role", "update"),
    validate(assignRoleSchema),
    assignRole
);

// orgRouter.post(
//   "/forgot-password",
//   validate(forgotPasswordSchema),
//   forgotPassword
// ); 

export default orgRouter;
