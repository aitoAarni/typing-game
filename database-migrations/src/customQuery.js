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

const query2 = "ALTER TABLE user_definition_progress ALTER COLUMN times_typed SET DEFAULT 1;"
execSql(query)
