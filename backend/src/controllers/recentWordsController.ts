import { Request, Response, NextFunction } from "express"
import { HTTPError } from "../utils"
import { getRecentWords } from "../services/recentWordsService"

export const getRecentWordsController =async  (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.id
        const start = parseInt(req.params.start, 10)
        const end = parseInt(req.params.end, 10)
        if (isNaN(start) || isNaN(end) || start > end) {
            throw new HTTPError(400, "Invalid range parameters")
        }

        const recentWords = await getRecentWords(user_id, start, end)
        res.status(200).json(recentWords)
    } catch (error) {
        next(error)
    }
}
