import { fetchDefinitions } from "../postgres/fetch.js"
import { QueueTimeout } from "../queue.js"
import { generateTtsToDirectory } from "../tts/main.js"
import { uploadDir } from "./upload.js"

const queue = new QueueTimeout(4000)

const createTtsFromDefinitions = async () => {
    return
    const whiteSpaceRegex = /\s+/g
    const definitions = await fetchDefinitions()
    const ttsDefinition = definitions.flatMap(row => {
        const wordList = [row.word.trim()]
        const definitionList = row.definition.split(whiteSpaceRegex)
        const sentenceList = row.sentence.split(whiteSpaceRegex)
        const textList = [...wordList, ...definitionList, ...sentenceList]
        const dirName = `${row.id}-${row.word}`
        return { textList, dirName }
    })
    ttsDefinition.forEach(({ textList, dirName }, index) => {
        queue.add(() => {
            console.log(index + 1, " / ", ttsDefinition.length, "  \n")
            generateTtsToDirectory(textList, dirName)
        })
    })
}

const uploadAudioToCloud = async () => {
    const path = `./audio`
    await uploadDir(path)
    console.log("Upload complete")
}

uploadAudioToCloud()
