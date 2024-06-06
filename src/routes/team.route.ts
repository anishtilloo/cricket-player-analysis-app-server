import { Router } from "express";

// controllers
import { getAllWithPagenation, getOneTeam } from "../controllers/teams/team.get.controller";
import { addTeam } from "../controllers/teams/team.post.controller";
import { updateTeam } from "../controllers/teams/team.put.controller";
import { deleteOneTeam } from "../controllers/teams/team.delete.controller";

// Middlewares
// validation
import { validate } from "../middlewares/validate";
import { TeamSchema } from "../schemas/team.schema";
import { authenticate, authenticateAndCheckRole } from "../middlewares/auth"; 

const teamRouter = Router();

teamRouter.use(authenticate);

// GET Routes
teamRouter.get('/get-team/:id', getOneTeam);
teamRouter.get('/get-all-teams',  getAllWithPagenation);


// POST Routes
teamRouter.post('/add-team', validate(TeamSchema), addTeam);


// PUT Routes
teamRouter.put('/update-team/:id',  validate(TeamSchema), updateTeam);

// Delete Routes
teamRouter.delete('/delete-team/:id', authenticateAndCheckRole, validate(TeamSchema), deleteOneTeam);


export default teamRouter;