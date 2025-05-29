import { ReactNode, useState } from "react"
import { ErrorContext } from "../hooks/useError"

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    return (
        <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
            {children}
        </ErrorContext.Provider>
    )
}
