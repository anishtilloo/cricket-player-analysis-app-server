import { Router } from "express";
import PlayerRoutes from "./player.route";
import TeamRoutes from "./team.route";
import AuthRoutes from "./auth.route";
import OrgRoutes from "./organization.route";

const router = Router();

router.use("/v1/org", OrgRoutes);
router.use("/v1/auth", AuthRoutes);
router.use("/v1/team", TeamRoutes);
router.use("/v1/player", PlayerRoutes);

export default router;