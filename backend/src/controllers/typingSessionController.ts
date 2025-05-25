import { NextFunction, Request, Response } from "express"
import { typingSessionRequestSchema } from "../types/typeGuards"
import {
    addTypingSession,
    queryTypingSessions,
} from "../services/typingSessionServices"

export const setTypingSession = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("body: ", req.body)
        const typingSessionReq = typingSessionRequestSchema.parse(req.body)
        const typingSessionLog = await addTypingSession(
            typingSessionReq,
            req.user?.id
        )

        console.log("typingSessionLog saved", typingSessionLog)
        res.status(201).json({
            typingSessionLog,
        })
    } catch (error) {
        next(error)
    }
}

export const getTypingSessions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.user?.id
        const result = await queryTypingSessions(id)
        res.status(200).json({
            typingSessions: result,
        })
    } catch (error) {
        next(error)
    }
}
