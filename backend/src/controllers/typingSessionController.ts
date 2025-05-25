import { NextFunction, Request, Response } from "express"

export const setTypingSession = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("Received typing session data:", req.body)
        res.status(201).json({
            message: "Typing session data received successfully",
        })
    } catch (error) {
        next(error)
    }
}
