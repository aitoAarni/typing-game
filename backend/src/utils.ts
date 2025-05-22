import jwt from 'jsonwebtoken';

export const generateToken = (data: any) => {

    const secret = process.env.SECRET

    const token = jwt.sign(data, secret!)
    return token
}