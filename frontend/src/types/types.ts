import { z } from "zod";
import { AuthResponseSchema, WordDefinitionSchema } from "./TypeGuards";

export type WordDefinition = z.infer<typeof WordDefinitionSchema>

export type AuthResponse = z.infer<typeof AuthResponseSchema>

export type User = Omit<AuthResponse, "token">
