import { Client } from "pg"
import dotenv from "dotenv"

process.env.server === "true"
    ? dotenv.config({ path: ".env.prod" })
    : dotenv.config({ path: ".env" })

const databaseUrl = process.env.DATABASE_URL

const client = new Client({
    connectionString: databaseUrl,
})

const dropTableQuery = `DROP TABLE IF EXISTS typing_sessions;`

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

const createUserSession = async () => {
    try {
        client.connect()
        await client.query(createUserSessionQuery)
    } catch (error) {
        console.error("Error creating typing_sessions table:", error)
    } finally {
        client.end()
        console.log("Database connection closed.")
    }
}

createUserSession()