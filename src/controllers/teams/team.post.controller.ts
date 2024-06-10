import { Request, Response } from 'express';
import httpStatus from 'http-status';

import addTeamService  from "../../services/teams/team.post.services"
import { getTeamUsingName } from '../../services/teams/team.get.services';
import ApiError from '../../utils/ApiError';

// POST request
// create new team in the DB
export async function addTeam(req: Request , res: Response) {
    try {
        const team = req.body;
        
        const teamExist = await getTeamUsingName(team.teamName);
        
        if (teamExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Please select a unique name for your team");
        }
        const result = await addTeamService(team);
        
        res.status(httpStatus.CREATED).json({ 
            success: true, 
            message: "Team Added Successfully", 
            data: result 
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            success: false, 
            message: `Something went wrong -> ${error}`, 
            error: error 
        })
    }
}