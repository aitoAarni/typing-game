import LocalStorage from "../services/LocalStorageService"
import useAuth from "./useAuth"

const useAuthUpdate = () => {
    const { setUser, setToken } = useAuth()

    const authUpdate = () => {
        const token = LocalStorage.getToken()
        const user = LocalStorage.getUser() 
        if (token && user) {
            setToken(token)
            setUser(user)
        } else {
            LocalStorage.removeUser()
            LocalStorage.removeToken()
            setToken(null)
            setUser(null)
        }
    }

    return authUpdate
}

export default useAuthUpdate