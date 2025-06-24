import { queryDatabase } from "../database/query"
import { definitionSchema } from "../types/typeGuards"

export const getWordDefinitionDb = async (id: number) => {
    const query = `SELECT * FROM definitions WHERE id = 
    (SELECT MIN(id) FROM definitions where id > $1)`

    const definitionArray = await queryDatabase(query, [id])
    if (definitionArray.length === 0) {
        throw new Error("No definition found")
    }
    const definition = definitionSchema.parse(definitionArray[0])
    return definition
}

export const getWordDefinitionCount = async () => {
    const query = `SELECT COUNT(*) FROM definitions;`
    const resultArray = await queryDatabase(query)
    if (resultArray.length === 0) {
        throw new Error("No definitions found")
    }
    return parseInt(resultArray[0].count, 10)
}

export const getMaxDefinitionId = async () => {
    const query = `SELECT MAX(id) FROM definitions;`
    const resultArray = await queryDatabase(query)
    if (typeof resultArray[0].max !== "number") {
        throw new Error("No definitions found or max ID is not a number")
    }
    return resultArray[0].max as number
}
