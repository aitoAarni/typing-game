import { API_URL } from "../config"

const getRemoteWordDefinition = async (id: number): Promise<string> => {
    const url = `${API_URL}/text/wordDefinition/` + String(id)
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error("Error fetching data")
        const text = response.text()
        console.log("text", text)
        return text
    } catch (error) {
        throw new Error("Network error: " + error)
    }
}

export { getRemoteWordDefinition }
