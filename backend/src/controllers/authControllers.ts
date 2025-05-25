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
        console.log(1)
        const ticket = await client.verifyIdToken({
            idToken: credentials,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        console.log(2)
        const playload = ticket.getPayload()
        if (!playload) {
            throw new HTTPError(400, "Invalid credentials")
        }
        const { sub: google_id, email, name } = playload

        console.log(3)
        let databaseUser = await getUserByGoogleId(google_id)

        console.log(4)
        const user = {
            google_id,
            email: email ?? "",
            username: name ?? "username",
        }
        console.log(5)
        if (!databaseUser) {
            databaseUser = await createUser(user)
        }

        console.log(6)
        const jwtToeken = generateToken(user)
        res.status(201).json({
            token: jwtToeken,
            id: databaseUser.id,
            username: databaseUser.username,
            email: databaseUser.email,
        })
        console.log(7)
    } catch (error) {
        next(error)
    }
}
