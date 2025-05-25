import { z } from "zod"
import { definitionSchema } from "./typeGuards"
import { databaseUserSchema } from "./typeGuards"

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
