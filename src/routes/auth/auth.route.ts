import { Router } from "express";
import { login, register } from "../../controllers/users/user.post.controller";

const authRouter = Router();

// GET Routes
authRouter.get('/team/:id')
authRouter.get('/get-all-teams')

authRouter.post('/register',  register);
authRouter.post('/login', login);

// POST Routes
authRouter.post('/team')


export default authRouter;