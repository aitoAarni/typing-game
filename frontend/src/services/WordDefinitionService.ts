import { WordDefinition, WordDefinitionService } from "../types/types"
import {
    getRemoteWordDefinitionLeitner,
    getRemoteWordDefinitionSequential,
} from "./GetRemoteText"
import LocalStorageService from "./LocalStorageService"

export class SequentialWordDefinitionService implements WordDefinitionService {
    currentDefinition!: WordDefinition | Promise<WordDefinition>
    nextDefinition!: WordDefinition | Promise<WordDefinition>
    fetchWordDefinition: (id: number) => Promise<WordDefinition>
    localStorageService: typeof LocalStorageService

    private constructor(
        fetchWordDefinition: (id: number) => Promise<WordDefinition>,
        localStorageService: typeof LocalStorageService
    ) {
        this.fetchWordDefinition = fetchWordDefinition
        this.localStorageService = localStorageService
        console.log("SequentialWordDefinitionService initialized")
    }

    async initializeDefinitions(id: number) {
        this.currentDefinition = await this.fetchWordDefinition(id)
        this.updateStorageId()

        this.nextDefinition = await this.fetchWordDefinition(
            this.currentDefinition.id
        )
    }

    static async newInstance(
        fetchWordDefinition: (id: number) => Promise<WordDefinition>,
        localStorageService: typeof LocalStorageService = LocalStorageService
    ) {
        console.log("new instance started")
        const id = localStorageService.getDefinitionId()
        const service = new SequentialWordDefinitionService(
            fetchWordDefinition,
            localStorageService
        )
        await service.initializeDefinitions(id)
        console.log("newInstance ready")
        return service
    }

    getCurrentDefinition() {
        console.log("sequential getCurrentDefinition called")
        return this.currentDefinition
    }

    async getNewDefinition() {
        this.currentDefinition = await this.getNextDefinition()
        this.updateStorageId()
        this.updateNextDefinition()
        return this.currentDefinition
    }

    async updateNextDefinition() {
        const resolvedNextDefinition = await this.getNextDefinition()
        await this.setNextDefinition(resolvedNextDefinition.id)
    }

    private async setNextDefinition(id: number) {
        this.nextDefinition = await this.fetchWordDefinition(id)
    }

    getNextDefinition() {
        return this.nextDefinition
    }

    private async updateStorageId() {
        const id = (await this.currentDefinition).id
        this.localStorageService.setDefinitionId(id)
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
        console.log("LeitnerWordDefinitionService initialized")
    }

    static newInstance(fetchWordDefinition: () => Promise<WordDefinition>) {
        return new LeitnerWordDefinitionService(fetchWordDefinition)
    }
    getCurrentDefinition() {
        console.log("leitner getCurrentDefinition called")
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

type DefinitionServiceType = "sequential" | "leitner"

const getDefinitionService = async (
    type: DefinitionServiceType,
    token?: string
) => {
    switch (type) {
        case "sequential":
            return await SequentialWordDefinitionService.newInstance(
                getRemoteWordDefinitionSequential
            )

        case "leitner":
            if (!token) {
                throw new Error(
                    "Token is required for Leitner word definition service"
                )
            }
            return LeitnerWordDefinitionService.newInstance(
                getRemoteWordDefinitionLeitner(token)
            )

        default:
            return SequentialWordDefinitionService.newInstance(
                getRemoteWordDefinitionSequential
            )
    }
}

export default getDefinitionService
