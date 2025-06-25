import { queryDatabase } from "../database/query"
import { recentWordSchema } from "../types/typeGuards"
import { RecentWord } from "../types/types"

export const getRecentWords = async (
    user_id: number,
    start: number,
    end: number
) => {
    const query = `WITH latest_sessions AS (
    SELECT
        ts.definition_id,
        MAX(ts.created_at) AS created_at
    FROM typing_sessions ts
    WHERE ts.user_id = $1
    GROUP BY ts.definition_id
),
ranked_definitions AS (
    SELECT
        d.id AS definition_id,
        d.word,
        d.definition,
        udp.times_typed,
        ls.created_at AS last_typed,
        ROW_NUMBER() OVER (ORDER BY ls.created_at DESC) AS row_number
    FROM latest_sessions ls
    JOIN definitions d ON d.id = ls.definition_id
    JOIN user_definition_progress udp
      ON udp.definition_id = ls.definition_id AND udp.user_id = $1
)

SELECT *
FROM ranked_definitions
WHERE row_number BETWEEN $2 AND $3;`

    const values = [user_id, start, end]

    const result = await queryDatabase(query, values)
    if (result.rowCount === 0) {
        throw new Error("No recent words found for this user")
    }
    const data: RecentWord[] = result.map((row: unknown) =>
        recentWordSchema.parse(row)
    )

    return data
}
