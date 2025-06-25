CREATE TABLE IF NOT EXISTS typing_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    definition_id INTEGER REFERENCE definitions(id),
    correct_characters INTEGER NOT NULL,
    total_characters INTEGER NOT NULL,
    word_count INTEGER NOT NULL,
    error_count INTEGER NOT NULL,
    accuracy NUMERIC(5,2) NOT NULL,
    time_seconds DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    google_id TEXT,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT
);

CREATE TABLE IF NOT EXISTS definitions (
    id SERIAL PRIMARY KEY,
    word TEXT NOT NULL,
    definition TEXT NOT NULL,
    sentence TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_definition_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    definition_id INTEGER REFERENCES definitions(id),
    bucket INTEGER NOT NULL DEFAULT 1 CHECK (bucket BETWEEN 1 AND 3),
    liked BOOLEAN NOT NULL DEFAULT FALSE,
    times_typed INTEGER NOT NULL DEFAULT 1,
    last_typed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, definition_id)
);

-- when db is big use this
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_definition_progress_user_def
ON user_definition_progress(user_id, definition_id);


WITH latest_sessions AS (
    SELECT
        ts.definition_id,
        MAX(ts.created_at) AS created_at
    FROM typing_sessions ts
    WHERE ts.user_id = 1
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
      ON udp.definition_id = ls.definition_id AND udp.user_id = 1
)

SELECT *
FROM ranked_definitions
WHERE row_number BETWEEN 0 AND 10;