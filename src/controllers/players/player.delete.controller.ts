import { Request, Response } from "express";
import { deletePlayer } from "../../services/players/player.delete.services"; 
import httpStatus from "http-status";

export async function deleteOnePlayer(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const playerId = String(id);
        await deletePlayer(playerId);
        return res.status(httpStatus.NO_CONTENT).json({
            success: true,
            message: "Player Deleted Successfully",
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}