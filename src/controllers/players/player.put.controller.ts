import { Request, Response } from "express";
import { update } from "../../services/players/player.put.services"

export async function updatePlayer(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const playerId = Number(id);
        const playerBody = req.body;
        const player = await update(playerId, playerBody);
        return res.status(200).json({
            success: true, 
            message: "Player Updated Successfully", 
            data: player 
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: "Something went wrong", 
        })
    }
}