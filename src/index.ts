// import packages or dependencies
import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import path from "path";

// import local files
import PlayerRoutes from "./routes/player/player.route"; 
import TeamRoutes from "./routes/team/team.route";
import authRoutes from "./routes/auth/auth.route";


const app = express();

const PORT = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load Routes
app.use("/api/v1", PlayerRoutes);
app.use("/api/v1", TeamRoutes);
app.use("/api/v1/auth", authRoutes)


// created the instance of Prisma client
const prisma = new PrismaClient()

app.get('/', (req, res) => {
    res.send("Hello World");
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`); 
})
