import { Router } from "express";
// controllers
import { getAllWithPagination, getOneTeam } from "../../controllers/teams/team.get.controller";
import { addTeam } from "../../controllers/teams/team.post.controller";
import { updateTeam } from "../../controllers/teams/team.put.controller";
import { deleteOneTeam } from "../../controllers/teams/team.delete.controller";
// Middlewares
// validation
import { validate } from "../../middlewares/validate";
import { TeamSchema } from "../../schemas/team.schema";
import { authenticate, authenticateAndCheckRole, hasPermission } from "../../middlewares/auth"; 
import { RoleEnumType } from "@prisma/client";

const teamRouter = Router();

teamRouter.use(authenticate);

// GET Routes
teamRouter.get(
    '/get-team/:id',
    hasPermission("team", "view"),
    getOneTeam
);

teamRouter.get(
    '/get-all-teams',
    hasPermission("team", "view"), 
    getAllWithPagination
);

// POST Routes
teamRouter.post(
    '/add-team',
    authenticateAndCheckRole([RoleEnumType.ADMIN,  RoleEnumType.TEAM_MANAGER]),
    hasPermission("team", "create"),
    validate(TeamSchema), 
    addTeam,
);

// PUT Routes
teamRouter.put(
    '/update-team/:id',
    authenticateAndCheckRole([RoleEnumType.ADMIN, RoleEnumType.TEAM_MANAGER, RoleEnumType.ANALYST]),
    hasPermission("team", "update"),
    validate(TeamSchema), 
    updateTeam
);

// Delete Routes
teamRouter.delete(
    '/delete-team/:id', 
    authenticateAndCheckRole([RoleEnumType.ADMIN, RoleEnumType.TEAM_MANAGER]),
    hasPermission("team", "delete"),
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