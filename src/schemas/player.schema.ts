import {
  z,
  object, 
  any, 
  intersection, 
  nativeEnum as _enum,
  infer as Zinfer,
} from 'zod';
import { 
  NumberAndFloatMinMaxSchema, 
  NumberSchema, 
  OptionalField, 
  StringArray, 
  StringMax50,
} from './common.schema';
import { PLAYERTYPE } from '@prisma/client';
import { TeamSchema } from './team.schema';

export const PlayerSchema: any = object({
  params: object({
    id: OptionalField(StringMax50()),
  }),
  body: object({
    playerName: StringMax50(),
    playerImg: OptionalField(StringMax50()),
    characteristics: StringArray(),
    height: intersection(
      NumberSchema(),
      NumberAndFloatMinMaxSchema("This field", 55, 300)
    ),
    weight: intersection(
      NumberSchema(),
      NumberAndFloatMinMaxSchema("This field", 1, 500)
    ),
    basePrice: NumberSchema(),
    actualPrice: NumberSchema(),
    fitnessScore: NumberSchema(),
    injured: OptionalField(any()),
    analysis: OptionalField(any()),
    physicals: OptionalField(any()),
    mentalStats: OptionalField(any()),
    playerType: OptionalField(z.nativeEnum(PLAYERTYPE)),
    team: OptionalField(TeamSchema),
  }),
});

export type PlayerSchemaType = Zinfer<typeof PlayerSchema["body"]>