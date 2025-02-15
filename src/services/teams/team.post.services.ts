import prisma from "../../utils/prisma";
import { TeamSchemaType } from "../../schemas/team.schema";

const addTeam = async (team: TeamSchemaType, organizationId: bigint) => {
    const { teamName, ownerName, coach, netWorth, teamLogo } = team;
    // const organization = prisma.organization.
    return  prisma.team.create({
        data: {
            teamName: teamName,
            ownerName: ownerName,
            coach: coach,
            netWorth: netWorth,
            teamLogo: teamLogo,
            organizationId: organizationId,
        }
    })
}

export default addTeam;