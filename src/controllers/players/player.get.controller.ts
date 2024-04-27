import { Request, Response } from "express";
import {
  listPlayers,
  getPlayer,
} from "../../services/players/player.get.services";
import httpStatus from "http-status";

// GET : Request
// get one player by id
export async function getOnePlayer(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const playerId = String(id);
    const player = await getPlayer(playerId);
    if (player) {
      return res.status(httpStatus.ACCEPTED).json({
        success: true,
        message: "Player Fetched Successfully",
        data: player,
      });
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Player does not exist in the DB",
      });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: true,
      message: "Something went wrong, Player does not exist in the DB",
      error: error,
    });
  }
}

// GET request
// get all players
export async function getAllPlayers(req: Request, res: Response) {
  try {
    console.log("players");
    
    const players = await listPlayers();
    console.log("players", players);
    
    if (!players) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "No Player exist in the DB",
        error: null,
      });
    }
    return res.status(httpStatus.ACCEPTED).json({
      success: true,
      message: "Players Fetched Successfully",
      data: players,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: true,
      message: "Something went wrong, player fetched unsuccessfully",
      error: error,
    });
  }
}
