import { BrowserStorage, StorageAdapter } from "../storage/LocalStorage"
import { User } from "../types/types"

// for testability
export const injectionStorageService = (storage: StorageAdapter) => {

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

    const setToken = (token: string) => {
        storage.setItem("token", token)
    }

    const setUser = (user: User) => {
        storage.setItem("user", JSON.stringify(user))
    }

    return { setDefinitionId, getDefinitionId, setToken, setUser }
}

const LocalStorage = injectionStorageService(new BrowserStorage())
export default LocalStorage
