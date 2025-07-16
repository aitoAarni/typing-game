import { BrowserStorage, StorageAdapter } from "../storage/LocalStorage"
import { User } from "../types/types"
import { DefinitionServiceType } from "./WordDefinitionService"

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

    const getToken = (): string | null => {
        return storage.getItem("token")
    }

    const removeToken = () => {
        storage.removeItem("token")
    }

    const setUser = (user: User) => {
        storage.setItem("user", JSON.stringify(user))
    }

    const getUser = (): User | null => {
        const user = storage.getItem("user")
        if (user) {
            return JSON.parse(user)
        }
        return null
    }

    const removeUser = () => {
        localStorage.removeItem("user")
    }

    const setDefinitionMode = (mode: DefinitionServiceType) => {
        localStorage.setItem("definitionMode", mode)
    }

    const getDefinitionMode = (): DefinitionServiceType => {
        const mode = localStorage.getItem("definitionMode")
        if (mode === "sequential" || mode === "leitner") {
            return mode
        }
        return "sequential"
    }

    const setAudioActive = (active: boolean) => {
        localStorage.setItem("audioActive", active.toString())
    }

    const getAudioActive = (): boolean => {
        const audioActive = localStorage.getItem("audioActive")
        return audioActive === "true"
    }

    const setAudioVolume = (volume: number) => [
        localStorage.setItem("audioVolume", volume.toString()),
    ]

    const getAudioVolume = (): number => {
        const volume = localStorage.getItem("audioVolume")
        if (volume) {
            const parsedVolume = parseFloat(volume)
            return isNaN(parsedVolume) ? 0.5 : parsedVolume
        }
        return 0.5
    }

    const setAudioSpeed = (speed: number) => {
        localStorage.setItem("audioSpeed", speed.toString())
    }

    const getAudioSpeed = (): number => {
        const speed = localStorage.getItem("audioSpeed")
        if (speed) {
            const parsedSpeed = parseFloat(speed)
            return isNaN(parsedSpeed) ? 1 : parsedSpeed
        }
        return 1
    }

    return {
        setDefinitionId,
        getDefinitionId,
        setToken,
        setUser,
        getToken,
        getUser,
        removeToken,
        removeUser,
        setDefinitionMode,
        getDefinitionMode,
        setAudioVolume,
        getAudioVolume,
        setAudioSpeed,
        getAudioSpeed,
        setAudioActive,
        getAudioActive,
    }
}

const LocalStorage = injectionStorageService(new BrowserStorage())
export default LocalStorage
