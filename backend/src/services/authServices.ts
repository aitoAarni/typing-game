import { queryDatabase } from "../database/db"
import {  databaseUserSchema } from "../types/typeGuards"
import { CreateUser, DatabaseUser, GoogleUser } from "../types/types"

export const getUserByGoogleId = async (googleId: string) => {
    const query = `SELECT * FROM users WHERE googleId = $1`
    const userArray = await queryDatabase(query, [googleId])
    if (userArray.length === 0) {
        return null
    }
    return databaseUserSchema.parse(userArray[0])
}

export const createUser = async (user: CreateUser) => {
    const query = `INSERT INTO users (googleId, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *`

    const values = [user.googleId ?? null, user.email, user.username, user.password ?? null]

    const userArray = await queryDatabase(query, values)
    if (userArray.length === 0) {
        throw new Error("User creation failed")
    }
    return databaseUserSchema.parse(userArray[0])

}