import path from "path"
import { fileURLToPath } from "url"
import { Storage } from "@google-cloud/storage"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const cwd = path.join(dirname, "..")

// console.log("import.meta.url: ", import.meta.url)
// console.log("filename: ", filename)
// console.log("cwd: ", cwd)
// console.log("dirname: ", dirname)

function main(
    bucketName = "typing-app-word-audio",
    fileName = "/revere/test2.mp3",
    destFileName = "./audio/testing/testingFile.mp3"
) {
    // [START storage_download_file]
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // The ID of your GCS bucket
    // const bucketName = 'your-unique-bucket-name';

    // The ID of your GCS file
    // const fileName = 'your-file-name';

    // The path to which the file should be downloaded
    // const destFileName = '/local/path/to/file.txt';

    // Imports the Google Cloud client library

    // Creates a client
    const storage = new Storage()

    async function downloadFile() {
        const options = {
            destination: destFileName,
        }

        // Downloads the file
        await storage.bucket(bucketName).file(fileName).download(options)

        console.log(
            `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
        )
    }

    downloadFile().catch(console.error)
    // [END storage_download_file]
}
main(...process.argv.slice(2))
