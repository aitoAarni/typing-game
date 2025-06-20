import { createContext } from "react"
import { AuthContextType } from "../types/types"

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
