// import packages or dependencies
import express from "express";
import cors from "cors";
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser';

// import local files
import PlayerRoutes from "./routes/player.route"; 
import TeamRoutes from "./routes/team.route";
import AuthRoutes from "./routes/auth.route";
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
app.use("/api/v1/auth", AuthRoutes);

app.get('/testing-route', (req, res) => {
    res.send("Testing Server is Working");
})

app.listen(PORT, () => {
    console.log(`\u{1F680} Server started on port ${PORT} \u{1F3AF}`); 
})
