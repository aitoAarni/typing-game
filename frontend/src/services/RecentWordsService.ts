import { API_URL } from "../config"
import { recentWordSchema } from "../types/TypeGuards"
import { RecentWord } from "../types/types"

export const getRecentWords = async (
    token: string,
    start: number,
    end: number = 10
) => {
    const url = `${API_URL}/recent-words/${start}/${end}`
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error("Error fetching recent words")
    }
    const recentWords: RecentWord[] = data.map((row: unknown) => recentWordSchema.parse(row))
    return recentWords
}
