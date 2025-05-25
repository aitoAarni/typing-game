import { NextFunction, Response, Request } from "express"
import { HTTPError } from "./utils"

export const errorHandler = (
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("Error occurred:", err)
    if (err instanceof HTTPError) {
        res.status(err.status).json({ error: err.message })
    } else {
        res.status(500).json({
            error: err.message || "Internal Server Error",
        })
    }
    next()
}
