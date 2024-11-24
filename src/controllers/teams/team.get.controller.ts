import { Request, Response } from 'express';
import { getTeam, getTeamsAlongWithTotalCount } from '../../services/teams/team.get.services';
import httpStatus from "http-status";
import ApiError from '../../utils/ApiError';

// GET : Request 
// get one team by id
export async function getOneTeam(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const teamId = String(id);
        const team = await getTeam(teamId);
        if (!team) {
            throw new ApiError(httpStatus.NOT_FOUND, "Team does not exist in the DB");
        }
        res.status(httpStatus.OK).json({
            success: true,
            message: "Team Fetched Successfully",
            data: team,
          });
    } catch (error) {  
        return res.status(httpStatus.BAD_REQUEST).json({ 
            success: true, 
            message: `Something went wrong -> ${error}`, 
            error: error 
        })
    }
}

// GET request
// get all teams
export async function getAllWithPagination(req: Request, res: Response){
    try {

        const [total, teams] = await getTeamsAlongWithTotalCount()
        res.status(httpStatus.OK).json({
          success: true,
          message: "Teams Fetched Successfully",
          data: teams,
          total: total,
        });
    } catch (error) { 
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          success: true,
          message: `Something went wrong, team fetching unsuccessful -> ${error}`,
          error: error,
        });
    }
}