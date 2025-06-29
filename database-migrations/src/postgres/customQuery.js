import { execSql } from "./utils.js"

const query = `INSERT INTO user_definition_progress (user_id, definition_id)
VALUES (3,  2)
ON CONFLICT (user_id, definition_id)
DO UPDATE
SET 
  times_typed = user_definition_progress.times_typed + 1,
  last_typed_at = NOW(),
  bucket = CASE 
    WHEN user_definition_progress.times_typed + 1 >= 7 THEN 3
    WHEN user_definition_progress.times_typed + 1 >= 4 THEN 2
    ELSE 1
  END;
`

const query2 = `CREATE TABLE IF NOT EXISTS user_definition_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    definition_id INTEGER REFERENCES definitions(id),
    bucket INTEGER NOT NULL DEFAULT 1 CHECK (bucket BETWEEN 1 AND 3),
    liked BOOLEAN NOT NULL DEFAULT FALSE,
    times_typed INTEGER NOT NULL DEFAULT 1,
    last_typed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, definition_id)
);`

const query3 = `SELECT d.*
FROM user_definition_progress udg
JOIN definitions d ON d.id = udg.definition_id
WHERE udg.user_id = 2 AND udg.bucket = 2
ORDER BY udg.last_typed_at ASC
LIMIT 1;`

// fetch a definition and update date typed to now
const query4 = `WITH selected AS (
  SELECT id
  FROM user_definition_progress
  WHERE user_id = 1 AND bucket = 1
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

// get how many entries are in each bucket for a specific user
const query5 = `WITH buckets AS (
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
  ON udg.bucket = b.bucket AND udg.user_id = 1
GROUP BY b.bucket
ORDER BY b.bucket;`

const queryWords = `SELECT word FROM definitions`
const result = await execSql(queryWords)
result.rows.forEach(row => {
  console.log(row.word)
})
// console.log("results: ", result.rows)
