import { 
    object, 
    any, 
    intersection, 
    nativeEnum as _enum,
    infer as Zinfer
} from 'zod';
import { 
    NumberAndFloatMinMaxSchema, 
    NumberSchema, 
    StringArray, 
    StringMax50 
} from './common.schema';
import { PLAYERTYPE } from '@prisma/client';
import { TeamSchema } from './team.schema';

export const PlayerSchema : any = object({
    playerName: StringMax50(),
    playerImg: any(),
    characteristics: StringArray(),
    height: intersection(NumberSchema(), NumberAndFloatMinMaxSchema("This field", 55, 300)),
    weight: intersection(NumberSchema(), NumberAndFloatMinMaxSchema("This field", 1, 500)),
    basePrise: NumberSchema(),
    actualPrise: NumberSchema(),
    fitnessScore: NumberSchema(),
    injured: any(),
    analysis: any(),
    physicals: any(),
    mentalStats: any(),
    playerType: _enum(PLAYERTYPE),
    team: TeamSchema,
});

export type PlayerSchemaType = Zinfer<typeof PlayerSchema>