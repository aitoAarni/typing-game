import { createContext } from "react"
import { TypingContextType } from "../types/types"

const TypingContext = createContext<TypingContextType | undefined>(undefined)

export default TypingContext