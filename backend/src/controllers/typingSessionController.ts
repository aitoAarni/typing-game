import { NextFunction, Request, Response } from "express"
import { typingSessionRequestSchema } from "../types/typeGuards"
import { addTypingSession } from "../services/typingSessionServices"

export const setTypingSession = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("req.body", req.body)
        console.log(1)
        const typingSessionReq = typingSessionRequestSchema.parse(req.body)
        console.log(2)
        const typingSessionLog = await addTypingSession(typingSessionReq, req.user?.id)

        res.status(201).json({
            typingSessionLog
        })
    } catch (error) {
        next(error)
    }
}
