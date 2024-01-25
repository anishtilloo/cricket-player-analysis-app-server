import prisma from "../../utils/prisma";
import { TeamSchemaType } from "../../schemas/team.schema";

const addTeam = async (team: TeamSchemaType) => {
    const { teamName, ownerName, coach, netWorth, teamLogo } = team;
    return  prisma.team.create({
        data: {
            teamName: teamName,
            ownerName: ownerName,
            coach: coach,
            netWorth: netWorth,
            teamLogo: teamLogo
        }
    })
}

export default addTeam;