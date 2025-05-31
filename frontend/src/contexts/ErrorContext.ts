import { createContext } from "react"

import { ErrorContextType } from "../types/types"

export const ErrorContext = createContext<ErrorContextType | undefined>(
    undefined
)