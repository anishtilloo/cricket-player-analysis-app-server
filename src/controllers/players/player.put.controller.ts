import { Request, Response } from "express";
import { update } from "../../services/players/player.put.services"
import httpStatus from "http-status";

export async function updatePlayer(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const playerId = String(id);
        const playerBody = req.body;
        const player = await update(playerId, playerBody);
        return res.status(httpStatus.ACCEPTED).json({
            success: true, 
            message: "Player Updated Successfully", 
            data: player 
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, 
            message: "Something went wrong", 
        })
    }
}