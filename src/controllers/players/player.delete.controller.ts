import { Request, Response } from "express";
import { deletePlayer } from "../../services/players/player.delete.services"; 

export async function deleteOnePlayer(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const playerId = Number(id);
        await deletePlayer(playerId);
        return res.status(200).json({
            success: true,
            message: "Player Deleted Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}