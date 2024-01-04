import { Request, Response } from 'express';
import addTeamService  from "../../services/teams/team.post.services"

// POST request
// create new team in the DB
export async function addTeam(req: Request , res: Response) {
    try {
        const team = req.body;
        const result = await addTeamService(team);
        res.status(201).json({ 
            success: true, 
            message: "Team Added Successfully", 
            data: result 
        })
    } catch (error) {
        res.status(500).json({ 
            success: true, 
            message: "Something went wrong", 
            error: error 
        })
    }
}