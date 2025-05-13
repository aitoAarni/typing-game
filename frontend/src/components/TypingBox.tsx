import { useEffect, useState, useRef} from "react"
import styles from "./TypingBox.module.scss"

interface TypingBoxProps {
    text?: string
}
const TypingBox = ({ text }: TypingBoxProps) => {
    const [charList, setCharList] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [typedCorrectly, setTypedCorrectly] = useState<boolean[]>([])
    const [keyPressInt, setKeyPressInt] = useState<number>(0)
    const currentCharRef = useRef<string>("")
    useEffect(() => {
        if (text?.length) {
            setCharList(text?.split(""))
            setTypedCorrectly(new Array(text.length).fill(null))
        }
    }, [text])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            currentCharRef.current = event.key
            setKeyPressInt((prev) => prev + 1)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    useEffect(() => {
        console.log(`currentCar: ${currentCharRef.current}`)
        const char = currentCharRef.current
        if (char.length === 1) {
            const copy = [...typedCorrectly]
            copy[currentIndex] = char === charList[currentIndex]
            setTypedCorrectly(copy)
            setCurrentIndex((prev) => prev + 1)
        }
    }, [keyPressInt])


    return (
        <div>
            {text} <br />
            {charList.map((char, index) => {
                const caretClass =
                    currentIndex == index ? styles.caretActive : styles.caret
                let charClass
                if (typedCorrectly[index] == true) {
                    charClass = styles.charCorrect
                } else if (typedCorrectly[index] == false) {
                    charClass = styles.charIncorrect
                } else {
                    charClass = styles.charUntyped
                }

                return (
                    <span key={index}>
                        <span className={caretClass}></span>
                        <span className={charClass}>{char}</span>
                    </span>
                )
            })}
        </div>
    )
}

export default TypingBox
