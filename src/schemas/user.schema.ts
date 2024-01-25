import { 
    z,
    object,
    nativeEnum as _enum,
    infer as Zinfer
} from 'zod';
import { 
    EmailSchema,
    OptionalField, 
    PasswordSchema, 
    StringMax50 
} from './common.schema';
import { RoleEnumType } from '@prisma/client';

export const CreateUserSchema : any = object({
    name: StringMax50(),
    email: EmailSchema(),
    password: PasswordSchema(),
    passwordConfirm: StringMax50(),
    role: OptionalField(z.nativeEnum(RoleEnumType)),
});

export type CreateUserSchemaType = Zinfer<typeof CreateUserSchema>