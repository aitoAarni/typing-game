import { queryDatabase } from "../database/db"
import { definitionSchema } from "../types/definitions"

export const getWordDefinitionDb = async (id: number): Promise<any> => {
    const query = `SELECT * FROM definitions WHERE id = $1`
    const definitionArray = await queryDatabase(query, [id])
    if (definitionArray.length === 0) {
        throw new Error("No definition found")
    }
    const definition = definitionSchema.parse(definitionArray[0])
    return definition
}
