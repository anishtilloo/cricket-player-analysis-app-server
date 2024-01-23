import { 
    object, 
    any,  
    nativeEnum as _enum,
    infer as Zinfer,
} from 'zod';
import {  
    NumberSchema, 
    StringMax50 
} from './common.schema';
import { PlayerSchema } from './player.schema';

export const TeamSchema : any = object({
    teamName: StringMax50(),
    ownerName: StringMax50(),
    coach: any(),
    netWorth: NumberSchema(),
    teamLogo: StringMax50(),
    players: PlayerSchema,
});

export type TeamSchemaType = Zinfer<typeof TeamSchema>