import { Router } from "express";

// controllers
import { getAll, getOneTeam } from "../../controllers/teams/team.get.controller";
import { addTeam } from "../../controllers/teams/team.post.controller";
import { updateTeam } from "../../controllers/teams/team.put.controller";
import { deleteOneTeam } from "../../controllers/teams/team.delete.controller";

// Middlewares
// validation
import { validate } from "../../middlewares/validate";
import { TeamSchema } from "../../schemas/team.schema";

const teamRouter = Router();

// GET Routes
teamRouter.get('/get-team/:id', validate(TeamSchema), getOneTeam);
teamRouter.get('/get-all-teams', getAll);


// POST Routes
teamRouter.post('/add-team', validate(TeamSchema), addTeam);


// PUT Routes
teamRouter.put('/update-team/:id', validate(TeamSchema), updateTeam);

// Delete Routes
teamRouter.delete('/delete-team/:id', validate(TeamSchema), deleteOneTeam);


export default teamRouter;