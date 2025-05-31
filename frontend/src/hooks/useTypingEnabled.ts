import { useContext } from "react"
import TypingContext from "../contexts/TypingContext"

const useTypingEnabled = () => {
    
    const context = useContext(TypingContext)
    if (!context) {
        throw new Error("useTypingEnabled must be used within a TypingProvider")
    }

    return context
}

export default useTypingEnabled