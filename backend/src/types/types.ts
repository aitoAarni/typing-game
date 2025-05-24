import { z } from "zod"
import { definitionSchema } from "./typeGuards"
import { databaseUserSchema } from "./typeGuards"

export type Definition = z.infer<typeof definitionSchema>

export type DatabaseUser = z.infer<typeof databaseUserSchema>

export type GoogleUser = Pick<
    DatabaseUser,
    "googleId" | "email" | "username"
> & {
    googleId: string
}

export interface CreateUser {
    googleId?: string
    email: string
    username: string
    password?: string
}
