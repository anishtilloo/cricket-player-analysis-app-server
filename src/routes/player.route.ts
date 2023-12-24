import { Router } from "express";

const playerRouter = Router();

// GET Routes
playerRouter.get('/get-player/:id')
playerRouter.get('/get-all-palyers')


// POST Routes
playerRouter.post('/insert-player');


export default playerRouter;