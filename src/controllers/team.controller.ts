
import { PrismaClient } from "@prisma/client";
import { TypedRequestBodyTeam, TypedResponseTeam } from "../types/team.types"

// created the instance of Prisma client
const prisma = new PrismaClient()

export async function addTeam(req: TypedRequestBodyTeam , res: TypedResponseTeam) {
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
        console.log(res);
        
        res.json({ 
            success: true, 
            message: "Added Novel Successfully", 
            data: result 
        })
    } catch (error) {
        console.log(error);
        
    }
}