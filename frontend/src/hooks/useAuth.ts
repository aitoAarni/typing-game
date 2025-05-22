import { createContext, useContext } from "react"
import { AuthContextType } from "../types/types"

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export default useAuth