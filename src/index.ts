// import packages or dependencies
import express from "express";
import cors from "cors";
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser';

// import local files
import PlayerRoutes from "./routes/player/player.route"; 
import TeamRoutes from "./routes/team/team.route";
import authRoutes from "./routes/auth/auth.route";
import { devEnvironmentVariable } from "./utils/envConstants";

// Load environment variables from .env file
dotenv.config({
    path: './env'
}); 
const app = express();

const PORT = devEnvironmentVariable.port;

// middlewares
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Load Routes
app.use("/api/v1/player", PlayerRoutes);
app.use("/api/v1/team", TeamRoutes);
app.use("/api/v1/auth", authRoutes);

app.get('/testing-route', (req, res) => {
    res.send("Testing Server is Working");
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`); 
})
