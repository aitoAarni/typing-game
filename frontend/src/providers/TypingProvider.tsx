import { ReactNode, useState } from "react"
import TypingContext from "../contexts/TypingContext"

const TypingProvider = ({children}: {children: ReactNode}) => {
    const [typingEnabled, setTypingEnabled] = useState(true)

    return (
        <TypingContext.Provider value={{typingEnabled, setTypingEnabled}} >
            {children}
        </TypingContext.Provider>
    )
}

export default TypingProvider