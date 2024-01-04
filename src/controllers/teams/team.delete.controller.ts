import { Request, Response } from 'express';
import { deleteTeam } from '../../services/teams/team.delete.services';

export async function deleteOneTeam(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const teamId = Number(id);
        await deleteTeam(teamId);
        return res.status(200).json({ 
            success: true, 
            message: "Team Deleted Successfully", 
        })
    } catch (error) {  
        return res.status(500).json({ 
            success: true, 
            message: "Something went wrong", 
            error: error 
        })
    }
}