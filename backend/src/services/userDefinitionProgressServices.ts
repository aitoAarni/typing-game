import { queryDatabase } from "../database/query"

export const addUserDefinitionProgress = async (
    user_id: number,
    definition_id: number
) => {
    const query = `INSERT INTO user_definition_progress (user_id, definition_id)
VALUES ($1,  $2)
ON CONFLICT (user_id, definition_id)
DO UPDATE
SET 
  times_typed = user_definition_progress.times_typed + 1,
  last_typed_at = NOW(),
  bucket = CASE 
    WHEN user_definition_progress.times_typed + 1 >= 7 THEN 3
    WHEN user_definition_progress.times_typed + 1 >= 4 THEN 2
    ELSE 1
  END;`

    const values = [user_id, definition_id]
    const result = await queryDatabase(query, values)
    if (result.rowCount === 0) {
        throw new Error("Failed to add user definition progress")
    }
    console.log("result", result)
}
