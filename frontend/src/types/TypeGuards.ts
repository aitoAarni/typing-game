import { z } from "zod"

export const WordDefinitionSchema = z.object({
    id: z.number(),
    word: z.string(),
    definition: z.string(),
    sentence: z.string(),
})

export const AuthResponseSchema = z.object({
    token: z.string(),
    username: z.string(),
    email: z.string(),
    id: z.string(),
})
