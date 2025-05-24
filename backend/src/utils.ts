import jwt from "jsonwebtoken"

export const generateToken = (data: any) => {
    const secret = process.env.SECRET

    const token = jwt.sign(data, secret!)
    return token
}

export class HTTPError extends Error {
    status: number
    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}
