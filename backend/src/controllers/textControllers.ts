import { Response, Request } from "express"
import { getWordDefinitionDb } from "../services/textServices";


export const getWordDefinition = async (req: Request, res: Response) => {
    const paramID = parseInt(req.params.id, 10)
    if (isNaN(paramID) || paramID < 0) {
        res.status(400).send("Invalid ID")
    }
    const id = paramID % 102
    const definition = await getWordDefinitionDb(id)
    res.status(200).send(
        definition.word +
            ": " +
            definition.definition +
            " - " +
            definition.sentence
    )
}
