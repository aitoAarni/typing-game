import { Client } from "pg"
import dotenv from "dotenv"

process.env.server === "true"
    ? dotenv.config({ path: ".env.prod" })
    : dotenv.config({ path: ".env" })

const databaseUrl = process.env.DATABASE_URL

const client = new Client({
    connectionString: databaseUrl,
})

export const execSql = async (Query, params) => {
    let res
    try {
        console.log("Connecting to the database...")
        await client.connect()
        console.log("Executing SQL query...")
        res = await client.query(Query, params)
        console.log(
            "Query executed successfully:",
            res.rowCount,
            "rows affected."
        )
    } catch (error) {
        console.error("Error executing SQL query:", error)
    } finally {
        await client.end()
        console.log("Database connection closed.")
    }
    return res
}
