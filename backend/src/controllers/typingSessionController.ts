import { NextFunction, Request, Response } from "express"
import { typingSessionRequestSchema } from "../types/typeGuards"
import {
    addTypingSession,
    queryTypingSessionActivity,
    queryTypingSessions,
} from "../services/typingSessionServices"
import { addUserDefinitionProgress } from "../services/userDefinitionProgressServices"

export const setTypingSession = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("Received typing session request:", req.body)
        const typingSessionReq = typingSessionRequestSchema.parse(req.body)
        const typingSessionLog = await addTypingSession(
            typingSessionReq,
            req.user?.id
        )
        await addUserDefinitionProgress(req.user?.id, typingSessionReq.definition_id)

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

export const getTypingSessionsActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.user?.id
        const typingSessionActivityList = await queryTypingSessionActivity(id)
        res.status(200).json(typingSessionActivityList)
    } catch (error) {
        next(error)
    }
}
