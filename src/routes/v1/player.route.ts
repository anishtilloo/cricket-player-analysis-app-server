import { Router } from "express";
// // controllers
// import { addPlayer } from "../controllers/players/player.post.controller";
import { getAllPlayers, getOnePlayer } from "../../controllers/players/player.get.controller";
import { updatePlayer } from "../../controllers/players/player.put.controller";
import { deleteOnePlayer } from "../../controllers/players/player.delete.controller";
// Middlewares
// validation
import { validate } from "../../middlewares/validate";
import { PlayerSchema } from '../../schemas/player.schema';
import { authenticate, authenticateAndCheckRole, hasPermission } from "../../middlewares/auth"; 
import { RoleEnumType } from "@prisma/client";

const playerRouter = Router();

playerRouter.use(authenticate);

// GET Routes
playerRouter.get(
  "/get-player/:id",
  authenticate,
  authenticateAndCheckRole([RoleEnumType.ADMIN, RoleEnumType.ANALYST, RoleEnumType.TEAM_MANAGER, RoleEnumType.RECRUITER, RoleEnumType.USER]),
  hasPermission('user_in_org', "view"),
  validate(PlayerSchema),
  getOnePlayer
);

playerRouter.get(
  '/get-all-players',
  authenticate,
  authenticateAndCheckRole([RoleEnumType.ADMIN, RoleEnumType.ANALYST, RoleEnumType.TEAM_MANAGER, RoleEnumType.RECRUITER, RoleEnumType.USER]),
  hasPermission('user_in_org', "view"),
  getAllPlayers
)

// POST Routes
// playerRouter.post(
//   '/insert-player', 
//   // authenticateAndCheckRole([]),
//   addPlayer
// );

// PUT Routes
playerRouter.put(
  '/update-player/:id', 
  authenticate,
  authenticateAndCheckRole([RoleEnumType.ADMIN]),
  hasPermission('user_in_org', "update"),
  validate(PlayerSchema),
  updatePlayer
);

// Delete Routes
playerRouter.delete(
  '/player-delete/:id', 
  authenticate,
  authenticateAndCheckRole([RoleEnumType.USER]),
  hasPermission("user_in_org", "delete"),
  deleteOnePlayer
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


export default playerRouter;

