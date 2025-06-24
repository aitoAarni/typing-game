import { API_URL } from "../config"
import { WordDefinitionSchema } from "../types/TypeGuards"

const getRemoteWordDefinitionSequential = async (id: number) => {
    const url = `${API_URL}/text/word-definition/` + String(id)
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error("Error fetching text")
        const responseJson = await response.json()
        const definitionObject = WordDefinitionSchema.parse(responseJson)
        return definitionObject
    } catch (error) {
        throw new Error("Network error: " + error)
    }
}

const getRemoteWordDefinitionLeitner = (token: string) => {
    const callback = async () => {
        const url = `${API_URL}/text/word-definition/random`
        const result = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (!result.ok) throw new Error("Error fetching text")
        const responseJson = await result.json()
        const definition = WordDefinitionSchema.parse(responseJson)
        return definition
    }
    return callback
}

export { getRemoteWordDefinitionSequential, getRemoteWordDefinitionLeitner }
