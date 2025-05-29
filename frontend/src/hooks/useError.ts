import { createContext, useContext } from "react"

import { ErrorContextType } from "../types/types"

export const ErrorContext = createContext<ErrorContextType | undefined>(
    undefined
)

const useError = () => {
    const context = useContext(ErrorContext)

    if (!context) {
        throw new Error("useError must be used within an ErrorProvider")
    }
    return context
}

export default useError