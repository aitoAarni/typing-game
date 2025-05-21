import { API_URL } from "../config"
import { WordDefinitionSchema } from "../types/TypeGuards"

const getRemoteWordDefinition = async (id: number) => {
    const url = `${API_URL}/text/wordDefinition/` + String(id)
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error("Error fetching data")
        const definitionObject = WordDefinitionSchema.parse(response.text())
        return definitionObject
    } catch (error) {
        throw new Error("Network error: " + error)
    }
}

export { getRemoteWordDefinition }
