import fs from "fs/promises"

const definitions = JSON.parse(
    await fs.readFile("./data/newProduction.json", "utf-8")
)

let count = 0
definitions.forEach(def => {
    count += def.word.length + def.definition.length + def.sentence.length
})

console.log(count)