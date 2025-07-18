import dotenv from "dotenv"

process.env.server === "true"
    ? dotenv.config({ path: ".env.prod" })
    : dotenv.config({ path: ".env" })

export const DATABASE_URL = process.env.DATABASE_URL
export const BUCKET_NAME = process.env.BUCKET_NAME
export const AUDIO_DIR = process.env.AUDIO_DIR