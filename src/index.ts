// import packages or dependencies
import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
// import cors from "cors";
import path from "path";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const prisma = new PrismaClient()

app.get('/', (req, res) => {
    res.send("Hello World");
})


// team post api
app.post('/api/team', async (req, res) => {
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
        res.json(200)
        return {
            success: true,
            result
        }
    } catch (error) {
        console.log(error);
        
    }
})

// team get api
app.get('/api/team/:id', async (req, res) => {
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
        res.json({result})
        return {
            success: true,
            result
        }
    } catch (error) {
        console.log(error);   
    }
})

// player post api
app.post('/api/insert-player', async (req, res) => {
    try {
        const result = await prisma.player.create({
            data: {
                playerName: req.body.playerName,
                physicals: req.body.physicals,
                mentalStats: req.body.mentalStats,
                characteristics: req.body.characteristics,
                injured: req.body.injured,
                analysis: req.body.analysis,
                height: req.body.height,
                weight: req.body.weight,
                basePrise: req.body.basePrise,
                actualPrise: req.body.actualPrise,
                fitnessScore: req.body.fitnessScore,
                playerType: req.body.playerType,
                teamId: req.body.teamId,
                teamName: req.body.teamName
            }
        })
        res.json({result})
    } catch (error) {
        console.log(error);
    }
})

// player get api
app.get('/api/get-player/:id', async (req, res) => {
    try {
        const result = await prisma.player.findFirst({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json({result})
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`); 
})
