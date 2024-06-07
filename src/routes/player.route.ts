import { Router } from "express";

// controllers
import { addPlayer } from "../controllers/players/player.post.controller";
import { getAllPlayers, getOnePlayer } from "../controllers/players/player.get.controller";
import { updatePlayer } from "../controllers/players/player.put.controller";
import { deleteOnePlayer } from "../controllers/players/player.delete.controller";

// Middlewares
// validation
import { validate } from "../middlewares/validate";
import { PlayerSchema } from '../schemas/player.schema';
import { authenticate, authenticateAndCheckRole } from "../middlewares/auth"; 

const playerRouter = Router();

playerRouter.use(authenticate);

// GET Routes
playerRouter.get(
  "/get-player/:id",
  validate(PlayerSchema),
  getOnePlayer
);
playerRouter.get('/get-all-players', getAllPlayers)


// POST Routes
playerRouter.post('/insert-player', addPlayer);

// PUT Routes
playerRouter.put('/update-player/:id', validate(PlayerSchema), updatePlayer);

// Delete Routes
playerRouter.delete('/player-delete/:id', authenticateAndCheckRole('ADMIN'), deleteOnePlayer);


export default playerRouter;

