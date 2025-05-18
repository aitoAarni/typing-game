import DefinitionService from "./LocalStorage"

class WordDefinitionService {
    id: number
    currentText: string | Promise<string>
    nextText: string | Promise<string>
    fetchText: (id: number) => Promise<string>

    constructor(id: number, fetcText: (id: number) => Promise<string>) {
        this.id = id - 1
        this.currentText = ''
        this.nextText = fetcText(id)
        this.fetchText = fetcText
    }
    
    static newInstance(fetchText: (id: number) => Promise<string>) {
        const id = DefinitionService.getDefinitionId() + 1
        return new WordDefinitionService(id, fetchText)
    }

    async getNewText() {
        this.id++
        this.updateStorageId()
        this.currentText = this.nextText
        this.fetchNextText()
        return this.currentText
    }

    fetchNextText() {
        this.nextText = this.fetchText(this.id + 1)
    } 
    
    updateStorageId() {
        DefinitionService.setDefinitionId(this.id)
    }
    
}

export default WordDefinitionService