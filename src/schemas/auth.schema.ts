import { object, string, z } from "zod";
import { EmailSchema, StringMax50 } from "./common.schema";

export const addUserSchema: any = object({
  body: object({
    name: StringMax50(),
    email: EmailSchema(),
    password: StringMax50(),
    role: z.enum(["USER", "RECRUITER", "TEAMOWNER", "ADMIN"]).default('USER'),
  }),
});

export const loginSchema: any = object({
  body: object({
    email: EmailSchema(),
    password: StringMax50(),
  }),
});

export const logoutSchema: any = object({
  body: object({
    refreshToken: StringMax50(),
  }),
});

export const refreshTokensSchema: any = object({
  body: object({
    refreshToken: string(),
  }),
});

export const forgotPasswordSchema: any = object({
  body: object({
    email: EmailSchema(),
  }),
});

export const resetPasswordSchema: any = object({
  query: object({
    token: StringMax50(),
  }),
  body: object({
    password: StringMax50(),
  }),
});

export const verifyEmailSchema: any = object({
  query: object({
    token: StringMax50(),
  }),
});

export const assignRoleSchema: any = object({
  body: object({
    userId: StringMax50(),
    role: z.enum(["USER", "RECRUITER", "TEAMOWNER", "ADMIN"]).default('USER'),
  }),
});
