import { Response, Request, NextFunction } from "express"
import {
    getWordDefinitionCount,
    getWordDefinitionDb,
} from "../services/textServices"
import { HTTPError } from "../utils"

export const getWordDefinition = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        
        const paramID = parseInt(req.params.id, 10)
        if (isNaN(paramID) || paramID < 0) {
            throw new HTTPError(400, "Invalid ID")
        }
        const wordCount = await getWordDefinitionCount()
        let id = paramID % (wordCount + 1)
        if (paramID > wordCount) {
            id++
        }
        const definition = await getWordDefinitionDb(id)
        res.status(200).json(definition)
    } catch (error) {
        next(error)
    }
}
