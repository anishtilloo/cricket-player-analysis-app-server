import { Request, Response } from 'express';
import addPlayerService  from "../../services/players/player.post.services"
import { PlayerSchema } from '../../schemas/player.schema';
import httpStatus from 'http-status';


// POST request
// create new player in the DB 
export async function addPlayer(req: Request , res: Response) {
    try {
        const player = req.body;
        console.log("player", player);
        
        const result = await addPlayerService(player);
        res.status(httpStatus.CREATED).json({ 
            success: true, 
            message: "Player Added Successfully", 
            data: result 
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            success: false, 
            message: "Something went wrong", 
            error: error 
        })
    }
}