import { queryDatabase } from "../database/db"
import {  databaseUserSchema } from "../types/typeGuards"
import { CreateUser } from "../types/types"

export const getUserByGoogleId = async (google_id: string) => {
    const query = `SELECT * FROM users WHERE google_id = $1`
    const userArray = await queryDatabase(query, [google_id])
    if (userArray.length === 0) {
        return null
    }
    console.log(userArray[0])
    return databaseUserSchema.parse(userArray[0])
}

export const createUser = async (user: CreateUser) => {
    const query = `INSERT INTO users (google_id, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *`

    const values = [user.google_id ?? null, user.email, user.username, user.password ?? null]

    const userArray = await queryDatabase(query, values)
    if (userArray.length === 0) {
        throw new Error("User creation failed")
    }
    return databaseUserSchema.parse(userArray[0])

}