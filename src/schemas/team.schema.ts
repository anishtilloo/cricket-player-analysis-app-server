import { 
    object, 
    any,  
    nativeEnum as _enum,
    infer as Zinfer,
    array,
} from 'zod';
import {  
    NumberSchema, 
    OptionalField, 
    StringMax50 
} from './common.schema';
import { PlayerSchema } from './player.schema';

export const TeamSchema : any = object({
    params: object({
        id: OptionalField(NumberSchema())
    }),
    body: object({
        teamName: StringMax50(),
        ownerName: StringMax50(),
        coach: any(),
        netWorth: NumberSchema(),
        teamLogo: StringMax50(),
        players: OptionalField(array(PlayerSchema)),
    })
});

export type TeamSchemaType = Zinfer<typeof TeamSchema["body"]>