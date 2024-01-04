import prisma from "../../utils/prisma";
import type { Team, Teams } from "../../types/team.types";

const addTeam = async (team: Omit<Team, "id">) : Promise<Team> => {
    const { teamName, ownerName, coach, netWorth } = team;
    return  prisma.team.create({
        data: {
            teamName: teamName,
            ownerName: ownerName,
            coach: coach,
            netWorth: netWorth
        }
    })
}

export default addTeam;