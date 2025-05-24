import { z } from "zod"

export const definitionSchema = z.object({
    id: z.number(),
    word: z.string(),
    definition: z.string(),
    sentence: z.string(),
})


export const databaseUserSchema = z.object({
    id: z.number(),
    googleId: z.string().nullable(),
    email: z.string().email(),
    username: z.string(),
    password: z.string().nullable(),
})

