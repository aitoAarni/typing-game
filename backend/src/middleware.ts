import { NextFunction, Response, Request } from "express"
import jwt, {JwtPayload} from "jsonwebtoken"
import { HTTPError } from "./utils"

// added here because Docker didn't work without
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

const SECRET = process.env.SECRET as string

export const tokenHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("In authorization middleware")
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new HTTPError(401, "Unauthorized: No token provided"))
    }
    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, SECRET)
        if (typeof decoded === "string") {
            return next(new HTTPError(401, "Token invalid"))
        }
        req.user = decoded
        next()
    } catch (error) {
        return next(new HTTPError(401, "Token invalid"))
    }
}

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
