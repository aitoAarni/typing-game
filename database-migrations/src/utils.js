import { Client } from "pg"
import { DATABASE_URL } from "./config.js"

const client = new Client({
    connectionString: DATABASE_URL,
})

export const sleep = ms => new Promise(resolve => setTimeout(() => {}, ms))

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
