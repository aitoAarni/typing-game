import textToSpeech from "@google-cloud/text-to-speech"

import fs from "node:fs"
import { writeFile } from "fs/promises"

const client = new textToSpeech.TextToSpeechClient()

const audioFolder = "./audio"

const writeWord = async (word, index, path) => {
    const request = {
        input: { text: word },
        voice: {
            languageCode: "en-GB",
            name: "en-GB-Standard-O",
        },
        audioConfig: { audioEncoding: "MP3" },
    }

    const [response] = await client.synthesizeSpeech(request)
    await writeFile(`${path}/${index}.mp3`, response.audioContent, "binary")
    console.log(`Audio content written to file: ${path}/${index}.mp3`)
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

const main = async (word, text) => {
    console.log(process.cwd())
    try {
        const textList = text.split(" ")
        console.log("textList: ", textList)
        const path = `${audioFolder}/${word}`
        createFolder(path)
        console.log("folder created: ", path)
        for (const [index, w] of textList.entries()) {
            await writeWord(w, index, path)
        }
        console.log(`Audio files for "${word}" created in ${path}`)
    } catch (error) {
        console.error("Error creating audio files:", error)
    }
}
;("revere | to very much respect and admire someone or something | The students revere their teacher.")
const testText =
    "Revere to very much respect and admire someone or something. The students revere their teacher."

main("revere", testText)
