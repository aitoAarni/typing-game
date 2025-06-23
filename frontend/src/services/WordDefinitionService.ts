import { WordDefinition, WordDefinitionService } from "../types/types"
import LocalStorageService from "./LocalStorageService"

export class SequentialWordDefinitionService implements WordDefinitionService {
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
        return new SequentialWordDefinitionService(
            id + 1,
            fetchWordDefinition,
            localStorageService
        )
    }
    getCurrentDefinition() {
        return this.currentDefinition
    }

    getNewDefinition() {
        this.currentDefinition = this.getNextDefinition()
        this.updateNextDefinition()
        return this.currentDefinition
    }

    updateNextDefinition() {
        this.increaseDefinitionId()
        this.setNextDefinition()
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

export class LeitnerWordDefinitionService implements WordDefinitionService {
    fetchWordDefinition: () => Promise<WordDefinition>
    currentDefinition: WordDefinition | Promise<WordDefinition>
    nextDefinition: WordDefinition | Promise<WordDefinition>

    constructor(fetchWordDefinition: () => Promise<WordDefinition>) {
        this.fetchWordDefinition = fetchWordDefinition
        this.currentDefinition = this.fetchWordDefinition()
        this.nextDefinition = this.fetchWordDefinition()
    }

    static newInstance(fetchWordDefinition: () => Promise<WordDefinition>) {
        return new LeitnerWordDefinitionService(fetchWordDefinition)
    }
    getCurrentDefinition() {
        return this.currentDefinition
    }
    getNewDefinition() {
        this.currentDefinition = this.getNextDefinition()
        this.nextDefinition = this.fetchWordDefinition()
        return this.currentDefinition
    }

    getNextDefinition() {
        return this.nextDefinition
    }

    updateNextDefinition() {
        this.nextDefinition = this.fetchWordDefinition()
    }
}
