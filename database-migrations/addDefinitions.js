import { Client } from "pg"
import "dotenv/config"
import fs from "fs/promises"

const definitions = JSON.parse(
    await fs.readFile("./data/definitions.json", "utf-8")
)
const databaseUrl = process.env.DATABASE_URL

const client = new Client({
    connectionString: databaseUrl,
})

const postDefinitions = async definitions => {
    try {
        await client.connect()

        const query = `INSERT INTO definitions (word, definition, sentence) VALUES
        ${definitions
            .map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
            .join(", ")}
        ON CONFLICT (word) DO UPDATE 
        SET definition = EXCLUDED.definition, sentence = EXCLUDED.sentence;`

        const values = definitions.flatMap(({ word, definition, sentence }) => [
            word,
            definition,
            sentence,
        ])
        console.log("sending word defiinitions to the database...")
        await client.query(query, values)
        console.log("Definitions successfully added to the database.")
    } catch (error) {
        console.error("Error connecting to the database:", error)
    } finally {
        await client.end()
        console.log("Database connection closed.")
    }
}

postDefinitions(definitions)
