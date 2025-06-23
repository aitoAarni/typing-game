import { Response, Request, NextFunction } from "express"
import {
    getWordDefinitionCount,
    getWordDefinitionDb,
} from "../services/textServices"
import { HTTPError, raffleBucket } from "../utils"
import {
    getNewWordDefinition,
    getUserDefinitionProgress,
    getWordsPerBucket,
} from "../services/userDefinitionProgressServices"

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

export const getLeitnerDefinition = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user_id = parseInt(req.user?.id, 10)
        if (isNaN(user_id) || user_id < 0) {
            throw new HTTPError(400, "Invalid user ID")
        }
        const wordsPerBucket = await getWordsPerBucket(user_id)
        const bucket_number = raffleBucket(wordsPerBucket)
        let definition
        if (bucket_number === 0) {
            definition = await getNewWordDefinition(user_id)
            console.log("new word id: ", definition.id)
        } else {
            definition = await getUserDefinitionProgress(user_id, bucket_number)
        }
        res.status(200).json(definition)
    } catch (error) {
        next(error)
    }
}
