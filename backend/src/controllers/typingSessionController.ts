import { NextFunction, Request, Response } from "express"

export const setTypingSession = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("Received typing session data:", req.body)
        console.log("user: ", req.user)
        res.status(201).json({
            user: req.user 
        })
    } catch (error) {
        next(error)
    }
}
