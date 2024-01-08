import { Request, Response } from 'express';
import { listPlayers, getPlayer } from '../../services/players/player.get.services';

// GET : Request 
// get one player by id
export async function getOnePlayer(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const playerId = Number(id);
        const player = await getPlayer(playerId);
        if (player) {
                return res.status(200).json({ 
                success: true, 
                message: "Player Fetched Successfully", 
                data: player 
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Player does not exist in the DB",
            })
        }
    } catch (error) {  
        return res.status(500).json({ 
            success: true, 
            message: "Something went wrong", 
            error: error 
        })
    }
}

// GET request
// get all players
export async function getAllPlayers(req: Request, res: Response){
    try {
        const players = await listPlayers();
        return res.status(200).json({ 
            success: true, 
            message: "Players Fetched Successfully", 
            data: players 
        })
    } catch (error) { 
        return res.status(501).json({ 
            success: true, 
            message: "Something went wrong", 
            error: error 
        })
    }
}