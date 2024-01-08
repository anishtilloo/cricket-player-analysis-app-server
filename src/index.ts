// import packages or dependencies
import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv'; 

// import local files
import PlayerRoutes from "./routes/player/player.route"; 
import TeamRoutes from "./routes/team/team.route";
import authRoutes from "./routes/auth/auth.route";

dotenv.config();   // Load environment variables from .env file 
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

app.get('/', (req, res) => {
    res.send("Hello World");
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`); 
})
