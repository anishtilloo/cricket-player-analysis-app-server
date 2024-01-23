import { Request, Response } from 'express';
import addPlayerService  from "../../services/players/player.post.services"
import { PlayerSchemaType, PlayerSchema } from '../../schemas/player.schema';


// POST request
// create new player in the DB 
export async function addPlayer(req: Request , res: Response) {
    try {
        const team = req.body;
        const validatedteam = PlayerSchema.parse(team)
        const result = await addPlayerService(validatedteam);
        res.status(201).json({ 
            success: true, 
            message: "Player Added Successfully", 
            data: result 
        })
    } catch (error) {
        res.status(500).json({ 
            success: true, 
            message: "Something went wrong", 
            error: error 
        })
    }
}