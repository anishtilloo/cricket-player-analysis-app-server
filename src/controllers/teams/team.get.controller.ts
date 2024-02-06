import { Request, Response } from 'express';
import { listTeams, getTeam } from '../../services/teams/team.get.services';
import httpStatus from "http-status";

// GET : Request 
// get one team by id
export async function getOneTeam(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const teamId = String(id);
        const team = await getTeam(teamId);
        if (team) {
                return res.status(httpStatus.OK).json({
                  success: true,
                  message: "Team Fetched Successfully",
                  data: team,
                });
        } else {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "Team does not exist in the DB",
            })
        }
    } catch (error) {  
        return res.status(httpStatus.BAD_REQUEST).json({ 
            success: true, 
            message: "Something went wrong", 
            error: error 
        })
    }
}

// GET request
// get all teams
export async function getAll(req: Request, res: Response){
    try {
        const teams = await listTeams();
        return res.status(httpStatus.OK).json({
          success: true,
          message: "Teams Fetched Successfully",
          data: teams,
        });
    } catch (error) { 
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          success: true,
          message: "Something went wrong, theam fetching unsuccessfully",
          error: error,
        });
    }
}