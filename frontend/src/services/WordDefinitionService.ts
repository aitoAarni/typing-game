
class WordDefinitionService {
    id: number
    currentText: string | Promise<string>
    nextText: string | Promise<string>
    fetchText: (id: number) => Promise<string>

    constructor(id: number, fetcText: (id: number) => Promise<string>) {
        this.id = id
        this.currentText = ''
        this.nextText = fetcText(id + 1)
        this.fetchText = fetcText
    }
    async getNewText() {
        this.id++
        this.currentText = this.nextText
        this.fetchNextText()
        return this.currentText
    }

    fetchNextText() {
        this.nextText = this.fetchText(this.id + 1)
    } 
    
}

export default WordDefinitionService