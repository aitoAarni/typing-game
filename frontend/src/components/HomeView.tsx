import { useEffect, useState } from "react"
const HomeView = () => {
    const [ typedText, setTypedText ] = useState("")
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setTypedText(event.key)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])
    return (
        <div>
            <h1>Welcome to the Typing App</h1>
            <input type="text" data-testid="typing-box" />
            <p>Typed Text: {typedText}</p>
        </div>
    )
}

export default HomeView