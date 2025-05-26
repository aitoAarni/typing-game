import { WordDefinition } from "../types/types"
import LocalStorageService from "./LocalStorageService"

class WordDefinitionService {
    id: number
    currentDefinition: WordDefinition | Promise<WordDefinition>
    nextDefinition: WordDefinition | Promise<WordDefinition>
    fetchWordDefinition: (id: number) => Promise<WordDefinition>
    localStorageService: typeof LocalStorageService

    constructor(id: number, fetchWordDefinition: (id: number) => Promise<WordDefinition>, localStorageService: typeof LocalStorageService) { 
        this.id = id - 1
        this.currentDefinition = {} as WordDefinition
        this.nextDefinition = fetchWordDefinition(id)
        this.fetchWordDefinition = fetchWordDefinition
        this.localStorageService = localStorageService
    }
    
    static newInstance(fetchWordDefinition: (id: number) => Promise<WordDefinition>, localStorageService: typeof LocalStorageService=LocalStorageService) {
        const id = localStorageService.getDefinitionId()
        return new WordDefinitionService(id, fetchWordDefinition, localStorageService)
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
        this.localStorageService.setDefinitionId(this.id)
    }
    
}

export default WordDefinitionService