import { Storage } from "@google-cloud/storage"
import { promisify } from "util"
import path from "path"
import fs from "fs"
import { AUDIO_DIR, BUCKET_NAME } from "../config.js"

const filePath = "./audio/revere/0.mp3"
// const filePath = `${AUDIO_DIR}/`

const destFileName = "/revere/test2.mp3"

const storage = new Storage()

export async function uploadFile() {
    const options = {
        destination: destFileName,
        // Optional:
        // Set a generation-match precondition to avoid potential race conditions
        // and data corruptions. The request to upload is aborted if the object's
        // generation number does not match your precondition. For a destination
        // object that does not yet exist, set the ifGenerationMatch precondition to 0
        // If the destination object already exists in your bucket, set instead a
        // generation-match precondition using its generation number.
        preconditionOpts: { ifGenerationMatch: 0 },
    }

    await storage.bucket(BUCKET_NAME).upload(filePath, options)
    console.log(`${filePath} uploaded to ${BUCKET_NAME}`)
}

export function uploadDir(directoryPath) {
    const readdir = promisify(fs.readdir)
    const stat = promisify(fs.stat)

    async function* getFiles(directory = ".") {
        for (const file of await readdir(directory)) {
            const fullPath = path.join(directory, file)
            const stats = await stat(fullPath)

            if (stats.isDirectory()) {
                yield* getFiles(fullPath)
            }

            if (stats.isFile()) {
                yield fullPath
            }
        }
    }

    async function uploadDirectory() {
        const bucket = storage.bucket(BUCKET_NAME)
        let successfulUploads = 0

        for await (const filePath of getFiles(directoryPath)) {
            try {
                const dirname = path.dirname(directoryPath)
                const destination = path.relative(dirname, filePath)

                await bucket.upload(filePath, { destination })

                // console.log(`Successfully uploaded: ${filePath}`)
                successfulUploads++
            } catch (e) {
                console.error(`Error uploading ${filePath}:`, e)
            }
        }

        console.log(
            `${successfulUploads} files uploaded to ${BUCKET_NAME} successfully.`
        )
    }

    uploadDirectory().catch(console.error)
}

