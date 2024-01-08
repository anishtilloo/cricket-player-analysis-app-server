import { Router } from "express";
import { getAllPlayers, getOnePlayer } from "../../controllers/players/player.get.controller";
import { addPlayer } from "../../controllers/players/player.post.controller";
import { updatePlayer } from "../../controllers/players/player.put.controller";
import { deleteOnePlayer } from "../../controllers/players/player.delete.controller";

const playerRouter = Router();

// GET Routes
playerRouter.get('/get-player/:id', getOnePlayer)
playerRouter.get('/get-all-palyers', getAllPlayers)


// POST Routes
playerRouter.post('/insert-player', addPlayer);

// PUT Routes
playerRouter.put('/update-player/:id', updatePlayer);

// Delete Routes
playerRouter.delete('/player/delete/:id', deleteOnePlayer);


export default playerRouter;