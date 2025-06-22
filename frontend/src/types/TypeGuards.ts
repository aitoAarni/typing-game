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
    id: z.number(),
})

export const TypingSessionTotalSchema = z.object({
    user_id: z.number(),
    total_sessions: z.number(),
    total_correct_characters: z.number(),
    total_characters: z.number(),
    total_errors: z.number(),
    total_words: z.number(),
    average_accuracy: z.number(),
    total_seconds: z.number(),
})

export const typingSessionActivitySchema = z.object({
    user_id: z.number(),
    session_date: z.string().transform(val => new Date(val)),
    total_seconds: z.number(),
})
