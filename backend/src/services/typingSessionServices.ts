import { TypingSessionRequest } from "../types/types"
import { queryDatabase } from "../database/query"
import { typingSessionDatabaseSchema } from "../types/typeGuards"

export const addTypingSession = async (
    typingSession: TypingSessionRequest,
    user_id: number
) => {
    const query = `INSERT INTO typing_sessions (user_id, typed_text, correct_characters,
        total_characters, error_count, word_count, accuracy, time_seconds) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`
    const values = [
        user_id,
        typingSession.typed_text ?? null,
        typingSession.correct_characters,
        typingSession.total_characters,
        typingSession.error_count,
        typingSession.word_count,
        typingSession.accuracy,
        typingSession.time_seconds,
    ]
    
    const result = await queryDatabase(query, values)
    console.log("result", result)
    if (result.rowCount === 0) {
        throw new Error("Failed to add typing session")
    }
    return typingSessionDatabaseSchema.parse(result[0])
}
