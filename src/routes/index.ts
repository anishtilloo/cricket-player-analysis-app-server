import { Router } from "express";
import PlayerRoutes from "./player.route";
import TeamRoutes from "./team.route";
import AuthRoutes from "./auth.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/team", TeamRoutes);
router.use("/player", PlayerRoutes);

export default router;