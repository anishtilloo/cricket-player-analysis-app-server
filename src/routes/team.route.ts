import { Router } from "express";
// controllers
import { getAllWithPagination, getOneTeam } from "../controllers/teams/team.get.controller";
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
teamRouter.get(
    '/get-team/:id', 
    getOneTeam
);

teamRouter.get(
    '/get-all-teams',  
    getAllWithPagination
);

// POST Routes
teamRouter.post(
    '/add-team',
    authenticateAndCheckRole(['ADMIN', 'TEAMOWNER']),
    validate(TeamSchema), 
    addTeam
);

// PUT Routes
teamRouter.put(
    '/update-team/:id',
    authenticateAndCheckRole(['ADMIN', 'TEAMOWNER']),
    validate(TeamSchema), 
    updateTeam
);

// Delete Routes
teamRouter.delete(
    '/delete-team/:id', 
    authenticateAndCheckRole(['ADMIN']), 
    validate(TeamSchema), 
    deleteOneTeam
);

// import upload from "../../middlewares/upload";
// upload.fields([
//     {
//         name: 'avatar',
//         maxCount: 1,
//     },
//     {
//         name: 'backgroundImg',
//         maxCount: 1,
//     }
//   ]),


export default teamRouter;