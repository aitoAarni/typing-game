import pool from "./pool"

export async function queryDatabase(
    query: string,
    params?: any[]
): Promise<any> {
    if (params === undefined) {
        params = []
    }
    const result = await pool.query(query, params)
    return result.rows
}
