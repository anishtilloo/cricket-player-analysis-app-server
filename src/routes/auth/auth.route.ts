import { Router } from "express";
import { validate } from "../../middlewares/validate";
import {
  addUser,
  login,
  logout,
  refreshTokens,
  resetPassword,
} from "../../controllers/auth/auth.controllers";
import {
  addUserSchema,
  loginSchema,
  logoutSchema,
  refreshTokensSchema,
  resetPasswordSchema,
} from "../../schemas/auth.schema";
// import uplode from "../../middlewares/upload";
// uplode.fields([
//     {
//         name: 'avatar',
//         maxCount: 1,
//     },
//     {
//         name: 'backgroundImg',
//         maxCount: 1,
//     }
//   ]), 

const authRouter = Router();

authRouter.post("/register", 
  validate(addUserSchema), 
  addUser
);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", validate(logoutSchema), logout);
authRouter.post(
  "/refresh-tokens",
  validate(refreshTokensSchema),
  refreshTokens
);
// authRouter.post(
//   "/forgot-password",
//   validate(forgotPasswordSchema),
//   forgotPassword
// );
authRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPassword
);

export default authRouter;
