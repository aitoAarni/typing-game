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