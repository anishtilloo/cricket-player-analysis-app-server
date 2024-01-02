import { Request, Response } from 'express';
import prisma from '../../utils/prisma';

export async function getOneTeam(req: Request, res: Response) {
    try {
        const result = await prisma.team.findFirst({
            where: {
                id: Number(req.params.id)
            },
            include: {
                players: true
            }
        })
        console.log(result);
        res.status(200).json({ 
            success: true, 
            message: "Team Fetched Successfully", 
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

export async function getAll(req: Request, res: Response){
    try {
        const result = await prisma.team.findMany({
            include: {
                players: true
            }
        })
        console.log(result);
        res.status(200).json({ 
            success: true, 
            message: "Teams Fetched Successfully", 
            data: result 
        })
    } catch (error) {
        console.log(error);   
        res.status(501).json({ 
            success: true, 
            message: "something went wrong", 
            error: error 
        })
    }
}