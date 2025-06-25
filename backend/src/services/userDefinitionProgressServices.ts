import { queryDatabase } from "../database/query"
import { definitionSchema, wordsPerBucketSchema } from "../types/typeGuards"
import { WordsPerBucket } from "../types/types"

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
}

export const getUserDefinitionProgress = async (
    user_id: number,
    bucket: number
) => {
    const query = `WITH selected AS (
  SELECT id
  FROM user_definition_progress
  WHERE user_id = $1 AND bucket = $2
  ORDER BY last_typed_at ASC
  LIMIT 1
),
updated AS (
  UPDATE user_definition_progress
  SET last_typed_at = NOW()
  WHERE id IN (SELECT id FROM selected)
  RETURNING definition_id
)
SELECT d.*
FROM definitions d
JOIN updated u ON d.id = u.definition_id;`
    const values = [user_id, bucket]
    const result = await queryDatabase(query, values)
    if (result.rowCount === 0) {
        throw new Error(
            "Something went wrong while fetching user definition progress"
        )
    }
    return definitionSchema.parse(result[0])
}

export const getWordsPerBucket = async (user_id: number) => {
    const query = `WITH buckets AS (
  SELECT 1 AS bucket
  UNION ALL
  SELECT 2
  UNION ALL
  SELECT 3
)
SELECT 
  b.bucket,
  COUNT(udg.id) AS word_count
FROM buckets b
LEFT JOIN user_definition_progress udg
  ON udg.bucket = b.bucket AND udg.user_id = $1
GROUP BY b.bucket
ORDER BY b.bucket;`
    const result = await queryDatabase(query, [user_id])
    if (result.rowCount === 0) {
        throw new Error(
            "Something went wrong while fetching user definition progress"
        )
    }
    const wordsPerBucket: WordsPerBucket[] = result.map((item: unknown) =>
        wordsPerBucketSchema.parse(item)
    )
    return wordsPerBucket
}

export const getNewWordDefinition = async (user_id: number) => {
    const query = `
    -- Try to get 1 new unseen word
(
  SELECT d.*
  FROM definitions d
  WHERE NOT EXISTS (
    SELECT 1
    FROM user_definition_progress udp
    WHERE udp.user_id = $1 AND udp.definition_id = d.id
  )
  ORDER BY RANDOM()
  LIMIT 1
)

UNION ALL

-- If none available, get a low-bucket word instead
(
  SELECT d.*
  FROM definitions d
  JOIN user_definition_progress udp ON udp.definition_id = d.id
  WHERE udp.user_id = $1
  ORDER BY udp.bucket ASC, udp.last_typed_at ASC
  LIMIT 1
)

LIMIT 1;
`
    const result = await queryDatabase(query, [user_id])
    if (result.rowCount === 0) {
        throw new Error("Error fetching a new word")
    }
    return definitionSchema.parse(result[0])
}
