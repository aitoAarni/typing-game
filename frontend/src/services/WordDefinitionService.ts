import { WordDefinition } from "../types/types"
import DefinitionService from "./LocalStorage"

class WordDefinitionService {
    id: number
    currentDefinition: WordDefinition | Promise<WordDefinition>
    nextDefinition: WordDefinition | Promise<WordDefinition>
    fetchWordDefinition: (id: number) => Promise<WordDefinition>
    definitionService: typeof DefinitionService

    constructor(id: number, fetchWordDefinition: (id: number) => Promise<WordDefinition>, definitionService: typeof DefinitionService) { 
        this.id = id - 1
        this.currentDefinition = {} as WordDefinition
        this.nextDefinition = fetchWordDefinition(id)
        this.fetchWordDefinition = fetchWordDefinition
        this.definitionService = definitionService
    }
    
    static newInstance(fetchWordDefinition: (id: number) => Promise<WordDefinition>, definitionService: typeof DefinitionService=DefinitionService) {
        const id = definitionService.getDefinitionId() + 1
        return new WordDefinitionService(id, fetchWordDefinition, definitionService)
    }

    async getNewDefinition() {
        this.id++
        this.updateStorageId()
        this.currentDefinition = this.nextDefinition
        this.fetchNextDefinition()
        return this.currentDefinition
    }

    fetchNextDefinition() {
        this.nextDefinition = this.fetchWordDefinition(this.id + 1)
    } 
    
    updateStorageId() {
        this.definitionService.setDefinitionId(this.id)
    }
    
}

export default WordDefinitionService