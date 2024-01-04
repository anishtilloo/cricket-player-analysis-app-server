import { Request, Response } from 'express';
import { update } from '../../services/teams/team.put.services';

export async function updateTeam(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const teamId = Number(id);
        const teamBody = req.body;
        const team = await update(teamId, teamBody);
        return res.status(200).json({ 
            success: true, 
            message: "Team Updated Successfully", 
            data: team 
        })
    } catch (error) {  
        return res.status(500).json({ 
            success: true, 
            message: "Something went wrong", 
            error: error 
        })
    }
}

