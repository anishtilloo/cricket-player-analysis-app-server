import { Request, Response } from 'express';
import { listTeams, getTeam } from '../../services/teams/team.get.services';

// GET : Request 
// get one team by id
export async function getOneTeam(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const teamId = Number(id);
        const team = await getTeam(teamId);
        if (team) {
                return res.status(200).json({ 
                success: true, 
                message: "Team Fetched Successfully", 
                data: team 
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Team does not exist in the DB",
            })
        }
    } catch (error) {  
        return res.status(500).json({ 
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
        return res.status(200).json({ 
            success: true, 
            message: "Teams Fetched Successfully", 
            data: teams 
        })
    } catch (error) { 
        return res.status(501).json({ 
            success: true, 
            message: "Something went wrong", 
            error: error 
        })
    }
}