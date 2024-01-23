import { Router } from "express";
import { getAll, getOneTeam } from "../../controllers/teams/team.get.controller";
import { addTeam } from "../../controllers/teams/team.post.controller";
import { updateTeam } from "../../controllers/teams/team.put.controller";
import { deleteOneTeam } from "../../controllers/teams/team.delete.controller";

const teamRouter = Router();

// GET Routes
teamRouter.get('/team/:id', getOneTeam);
teamRouter.get('/get-all-teams', getAll);


// POST Routes
teamRouter.post('/add-team', addTeam);


// PUT Routes
teamRouter.put('/update-team/:id', updateTeam);

// Delete Routes
teamRouter.delete('/team/delete/:id', deleteOneTeam);


export default teamRouter;