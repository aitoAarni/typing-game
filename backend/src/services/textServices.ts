import { queryDatabase } from "../database/query"
import { definitionSchema } from "../types/typeGuards"

export const getWordDefinitionDb = async (id: number) => {
    console.log("Fetching definition for ID:", id)
    const query = `SELECT * FROM definitions WHERE id = $1`
    const definitionArray = await queryDatabase(query, [id])
    if (definitionArray.length === 0) {
        throw new Error("No definition found")
    }
    const definition = definitionSchema.parse(definitionArray[0])
    return definition
}
