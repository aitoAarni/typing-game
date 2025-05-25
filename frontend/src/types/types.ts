import { z } from "zod";
import { AuthResponseSchema, WordDefinitionSchema } from "./TypeGuards";

export type WordDefinition = z.infer<typeof WordDefinitionSchema>

export type AuthResponse = z.infer<typeof AuthResponseSchema>

export type User = Omit<AuthResponse, "token">

export interface AuthContextType {
    user: User | null
    token: string | null
    setUser: (user: User | null) => void
    setToken: (token: string | null) => void
}

export interface TypingStatistics {
    accuracy: number | string
    wpm: number
    time: number
    wordCount: number
    errorCount: number
}