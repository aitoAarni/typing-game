import { TypingSessionActivity, TypingSessionRequest } from "../types/types"
import { queryDatabase } from "../database/query"
import {
    typingSessionActivitySchema,
    typingSessionDatabaseSchema,
    typingSessionsTotalSchema,
} from "../types/typeGuards"
import { HTTPError } from "../utils"

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
    if (result.rowCount === 0) {
        throw new Error("Failed to add typing session")
    }
    return typingSessionDatabaseSchema.parse(result[0])
}

export const queryTypingSessions = async (user_id: number) => {
    const query = `SELECT 
    user_id,
    COUNT(*)::INT AS total_sessions,
    SUM(correct_characters)::INT AS total_correct_characters,
    SUM(total_characters)::INT AS total_characters,
    SUM(error_count)::INT AS total_errors,
    SUM(word_count)::INT AS total_words,
    ROUND(AVG(accuracy)::NUMERIC, 2)::FLOAT AS average_accuracy,
    SUM(time_seconds)::INT AS total_seconds
     FROM typing_sessions WHERE user_id = $1 GROUP BY user_id;`
    const result = await queryDatabase(query, [user_id])
    if (result.rowCount === 0) {
        throw new HTTPError(404, "No typing sessions found for this user")
    }
    const typingSessionsTotal = typingSessionsTotalSchema.parse(result[0])
    return typingSessionsTotal
}

export const queryTypingSessionActivity = async (user_id: number) => {
    const query = `
    SELECT
    user_id,
    DATE(created_at) AS session_date,
    SUM(time_seconds) AS total_seconds
FROM
    typing_sessions
WHERE
    user_id = $1
    AND created_at >= NOW() - INTERVAL '1 year'
GROUP BY
    user_id,
    DATE(created_at)
ORDER BY
    session_date DESC;`
    const result = await queryDatabase(query, [user_id])
    if (result.rowCount === 0) {
        throw new HTTPError(
            404,
            "No typing session activity found for this user"
        )
    }
    const typingSessionActivityList: TypingSessionActivity[] = result.map(
        (row: unknown) => typingSessionActivitySchema.parse(row)
    )
    return typingSessionActivityList
}
