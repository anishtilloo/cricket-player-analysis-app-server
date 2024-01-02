import { Request, Response } from 'express';
import prisma from '../../utils/prisma';


export async function addTeam(req: Request , res: Response) {
    try {
        const result = await prisma.team.create({
            data: {
                teamName: req.body.teamName,
                ownerName: req.body.ownerName,
                coach: req.body.coach,
                netWorth: req.body.netWorth
            }
        })
        console.log(result);
        res.status(201).json({ 
            success: true, 
            message: "Team Added Successfully", 
            data: result 
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({ 
            success: true, 
            message: "Team Added Successfully", 
            error: error 
        })
    }
}