import { z } from "zod"
import {
    definitionSchema,
    typingSessionActivitySchema,
    typingSessionDatabaseSchema,
    typingSessionRequestSchema,
    typingSessionsTotalSchema,
    wordsPerBucketSchema,
} from "./typeGuards"
import { databaseUserSchema } from "./typeGuards"
import { JwtPayload } from "jsonwebtoken"

export type Definition = z.infer<typeof definitionSchema>

export type DatabaseUser = z.infer<typeof databaseUserSchema>

export type GoogleUser = Pick<
    DatabaseUser,
    "google_id" | "email" | "username"
> & {
    google_id: string
}

export interface CreateUser {
    google_id?: string
    email: string
    username: string
    password?: string
}

export type TypingSessionRequest = z.infer<typeof typingSessionRequestSchema>

export type TypingSessionDatabase = z.infer<typeof typingSessionDatabaseSchema>

export type TypingSessionsTotal = z.infer<typeof typingSessionsTotalSchema>

export type TypingSessionActivity = z.infer<typeof typingSessionActivitySchema>

export type WordsPerBucket = z.infer<typeof wordsPerBucketSchema>
