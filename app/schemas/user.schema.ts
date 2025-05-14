import { z } from 'zod'

const userBaseSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    email: z.string().email("Invalid email address"),
    password: z.string(),
    game_tag: z.string(),
    is_super_admin: z.boolean().default(false),
})

export const userCreateSchema = userBaseSchema.extend({
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const userUpdateSchema = z.object({
    id: z.string().uuid("Valid ID is required for updates"),
}).extend({
    ...userBaseSchema.partial().shape
})

export const userResponseSchema = userBaseSchema.extend({
    id: z.string().uuid(),
});

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;


