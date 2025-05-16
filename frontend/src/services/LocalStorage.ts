import { BrowserStorage, StorageAdapter } from "../storage/LocalStorage"

// for testability
export const injectionDefinitionService = (storage: StorageAdapter) => {
    const setDefinitionId = (id: number) => {
        storage.setItem("definitionId", id.toString())
    }

    const getDefinitionId = (): number => {
        const id = storage.getItem("definitionId")
        if (id) {
            return parseInt(id, 10)
        }
        return 0
    }
    return { setDefinitionId, getDefinitionId }
}

const DefinitionService = injectionDefinitionService(new BrowserStorage())
export default DefinitionService
