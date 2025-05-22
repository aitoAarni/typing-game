import { ReactNode, useEffect, useState } from "react"
import { User } from "../types/types"
import LocalStorage from "../services/LocalStorageService"
import { AuthContext } from "../hooks/useAuth"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    useEffect(() => {
        const storageUser = LocalStorage.getUser()
        const storageToken = LocalStorage.getToken()

        if (storageUser && storageToken) {
            setUser(storageUser)
            setToken(storageToken)
        } else {
            LocalStorage.removeUser()
            LocalStorage.removeToken()
        }
    }, [])
    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
