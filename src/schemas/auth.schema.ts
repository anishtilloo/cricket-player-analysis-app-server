import { object, string, z } from "zod";
import { RoleEnumType } from "@prisma/client";
import { EmailSchema, StringMax50 } from "./common.schema";

export const addUserSchema = object({
  body: object({
    name: StringMax50(),
    email: EmailSchema(),
    password: StringMax50(),
    role: z.enum([RoleEnumType.ADMIN, RoleEnumType.ANALYST, RoleEnumType.PLAYER, RoleEnumType.RECRUITER, RoleEnumType.TEAM_MANAGER, RoleEnumType.USER]).default(RoleEnumType.USER),
    organization: StringMax50(),
  }),
});

export const loginSchema = object({
  body: object({
    email: EmailSchema(),
    password: StringMax50(),
  }),
});

export const logoutSchema = object({
  body: object({
    refreshToken: StringMax50(),
  }),
});

export const refreshTokensSchema = object({
  body: object({
    refreshToken: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: EmailSchema(),
  }),
});

export const resetPasswordSchema = object({
  query: object({
    token: StringMax50(),
  }),
  body: object({
    password: StringMax50(),
  }),
});

export const verifyEmailSchema = object({
  query: object({
    token: StringMax50(),
  }),
});

export const assignRoleSchema = object({
  body: object({
    userId: StringMax50(),
    role: z.enum([RoleEnumType.ADMIN, RoleEnumType.ANALYST, RoleEnumType.PLAYER, RoleEnumType.RECRUITER, RoleEnumType.TEAM_MANAGER, RoleEnumType.USER]).default(RoleEnumType.USER),
  }),
});
