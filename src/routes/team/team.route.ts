import { Router } from "express";

const teamRouter = Router();

// GET Routes
teamRouter.get('/team/:id')
teamRouter.get('/get-all-teams')


// POST Routes
teamRouter.post('/team')


export default teamRouter;