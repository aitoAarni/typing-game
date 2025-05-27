import { WordDefinition } from "../types/types"
import LocalStorageService from "./LocalStorageService"

class WordDefinitionService {
    id: number
    currentDefinition: WordDefinition | Promise<WordDefinition>
    nextDefinition: WordDefinition | Promise<WordDefinition>
    fetchWordDefinition: (id: number) => Promise<WordDefinition>
    localStorageService: typeof LocalStorageService

    constructor(
        id: number,
        fetchWordDefinition: (id: number) => Promise<WordDefinition>,
        localStorageService: typeof LocalStorageService
    ) {
        this.id = id
        this.currentDefinition = fetchWordDefinition(id)
        this.nextDefinition = fetchWordDefinition(id + 1)
        this.fetchWordDefinition = fetchWordDefinition
        this.localStorageService = localStorageService
        this.updateStorageId()
    }

    static newInstance(
        fetchWordDefinition: (id: number) => Promise<WordDefinition>,
        localStorageService: typeof LocalStorageService = LocalStorageService
    ) {
        const id = localStorageService.getDefinitionId()
        return new WordDefinitionService(
            id + 1,
            fetchWordDefinition,
            localStorageService
        )
    }
    getCurrentDefinition() {
        return this.currentDefinition
    }

    getNewDefinition() {
        this.increaseDefinitionId()
        this.currentDefinition = this.getNextDefinition()
        this.setNextDefinition()
        return this.currentDefinition
    }

    setNextDefinition() {
        this.nextDefinition = this.fetchWordDefinition(this.id + 1)
    }

    getNextDefinition() {
        return this.nextDefinition
    }

    increaseDefinitionId() {
        this.id++
        this.updateStorageId()
    }

    updateStorageId() {
        this.localStorageService.setDefinitionId(this.id)
    }
}

export default WordDefinitionService
