import { Request, Response } from 'express';
import { deleteTeam } from '../../services/teams/team.delete.services';
import httpStatus from "http-status";

export async function deleteOneTeam(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const teamId = String(id);
        await deleteTeam(teamId);
        return res.status(httpStatus.OK).json({
          success: true,
          message: "Team Deleted Successfully",
        });
    } catch (error) {  
        return res.status(httpStatus.BAD_REQUEST).json({ 
            success: true, 
            message: "Something went wrong, team deletion unsuccessful", 
            error: error 
        })
    }
}