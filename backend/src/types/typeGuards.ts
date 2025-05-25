import { z } from "zod"

export const definitionSchema = z.object({
    id: z.number(),
    word: z.string(),
    definition: z.string(),
    sentence: z.string(),
})

export const databaseUserSchema = z.object({
    id: z.number(),
    google_id: z.string().nullable(),
    email: z.string().email(),
    username: z.string(),
    password: z.string().nullable(),
})

export const typingSessionRequestSchema = z.object({
    typed_text: z.string().optional().nullable(),
    total_characters: z.number(),
    correct_characters: z.number(),
    error_count: z.number(),
    word_count: z.number(),
    accuracy: z.number(),
    time_seconds: z.number(),
})

export const typingSessionDatabaseSchema = typingSessionRequestSchema.extend({
    user_id: z.number(),
    created_at: z.date(),
    accuracy: z.string()
})
