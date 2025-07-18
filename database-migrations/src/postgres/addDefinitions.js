import fs from "fs/promises"
import { execSql } from "../utils.js"

const definitions = JSON.parse(
    await fs.readFile("./data/newProduction.json", "utf-8")
)

const query = `INSERT INTO definitions (word, definition, sentence) VALUES
${definitions
    .map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
    .join(", ")}
`

const values = definitions.flatMap(({ word, definition, sentence }) => [
    word,
    definition,
    sentence,
])

console.log(await execSql(query, values))
