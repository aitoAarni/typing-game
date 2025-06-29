import textToSpeech from "@google-cloud/text-to-speech"
import fs from "node:fs"
import { writeFile } from "fs/promises"
import { AUDIO_DIR } from "../config.js"

// const voiceName = "en-GB-Chirp3-HD-Enceladus"
const voiceName = "en-GB-News-K"


const writeWord = async (word, fileName, directory) => {
    const client = new textToSpeech.TextToSpeechClient()
    const request = {
        input: { text: word },
        voice: {
            languageCode: "en-GB",
            name: voiceName,
        },
        audioConfig: { audioEncoding: "MP3" },
    }

    const [response] = await client.synthesizeSpeech(request)
    await writeFile(
        `${directory}/${fileName}.mp3`,
        response.audioContent,
        "binary"
    )
}

const createFolder = folderName => {
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const generateTtsToDirectory =  (
    textList,
    dirName,
) => {
    if (!Array.isArray(textList)) {
        throw new Error("textList must be an array")
    }
    try {
        const path = `${AUDIO_DIR}/${dirName}`

        createFolder(path)

        for (const [index, w] of textList.entries()) {
            const fileName = `${index}-${w}`
            writeWord(w, fileName, path)
        }
    } catch (error) {
        fs.appendFile(
            "./error.log",
            `\nfolderName: ${dirName} ${new Date().toISOString()} - ${error}\n`,
            err => {
                console.error("Error writing to error.log:", err)
            }
        )
        console.error("Error creating audio files:", error)
    }
}
