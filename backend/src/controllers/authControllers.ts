import { Request, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import { generateToken } from "../utils"
import { createUser, getUserByGoogleId } from "../services/authServices"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const authGoogle = async (req: Request, res: Response) => {
    const credentials = req.body.credentials
    if (typeof credentials !== "string") {
        throw new Error("Invalid credentials")
    }
    try {
        const ticket = await client.verifyIdToken({
            idToken: credentials,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        const playload = ticket.getPayload()
        if (!playload) {
            throw new Error("Invalid payload")
        }
        const { sub: googleId, email, name } = playload
        let databaseUser = await getUserByGoogleId(googleId)

        const user = {
            googleId,
            email: email ?? "",
            username: name ?? "username",
        }
        if (!databaseUser) {
            databaseUser = await createUser(user)
        }

        const jwtToeken = generateToken(user)
        res.status(201).json({
            token: jwtToeken,
            id: databaseUser.id,
            username: databaseUser.username,
            email: databaseUser.email,
        })
    } catch (error) {}
}
