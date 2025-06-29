import { execSql } from "./utils.js"



const createUserSessionQuery = `CREATE TABLE IF NOT EXISTS typing_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    typed_text TEXT,
    correct_characters INTEGER NOT NULL,
    total_characters INTEGER NOT NULL,
    word_count INTEGER NOT NULL,
    error_count INTEGER NOT NULL,
    accuracy NUMERIC(5,2) NOT NULL,
    time_seconds DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);`


execSql(createUserSessionQuery)
