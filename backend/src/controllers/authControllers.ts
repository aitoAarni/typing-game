import { Request, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import { generateToken } from "../utils"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const authGoogle = async (req: Request, res: Response) => {
    console.log("Google auth controller")
    const credentials = req.body.credentials
    console.log("Credentials: ", credentials)
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
        const user = {
            googleId,
            email,
            name,
        }
        const jwtToeken = generateToken(user)
        const id = 0
        res.status(201).json({
            token: jwtToeken,
            id,
            username: name,
            email,
        })
    } catch (error) {}
}
