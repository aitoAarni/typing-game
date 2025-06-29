import { execSql } from "../utils.js"

export const fetchDefinitions = async () => {
    const query = `SELECT * FROM definitions`
    const response = await execSql(query)
    return response.rows
}

