import { NextFunction, Request, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import { generateToken, HTTPError } from "../utils"
import { createUser, getUserByGoogleId } from "../services/authServices"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const authGoogle = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const credentials = req.body.credentials
        if (typeof credentials !== "string") {
            throw new HTTPError(400, "Invalid credentials")
        }
        const ticket = await client.verifyIdToken({
            idToken: credentials,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const playload = ticket.getPayload()
        if (!playload) {
            throw new HTTPError(400, "Invalid credentials")
        }
        const { sub: google_id, email, name } = playload

        let databaseUser = await getUserByGoogleId(google_id)

        const user = {

            google_id,
            email: email ?? "",
            username: name ?? "username",
        }
        if (!databaseUser) {
            databaseUser = await createUser(user)
        }

        const tokenUser = {
            id: databaseUser.id,
            username: databaseUser.username,
            email: databaseUser.email,
        }
        const jwtToken = generateToken(tokenUser)
        res.status(201).json({
            token: jwtToken,
            id: databaseUser.id,
            username: databaseUser.username,
            email: databaseUser.email,
        })
    } catch (error) {
        next(error)
    }
}
