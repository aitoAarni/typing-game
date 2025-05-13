import { useEffect, useState } from "react"
import styles from "./TypingBox.module.scss"

interface TypingBoxProps {
    text?: string
}
const TypingBox = ({ text }: TypingBoxProps) => {
    const [charList, setCharList] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [typedCorrectly, setTypedCorrectly] = useState<boolean[]>([])

    useEffect(() => {
        if (text?.length) {
            setCharList(text?.split(""))
            setTypedCorrectly(new Array(text.length).fill(null))
        }
    }, [text])
    useEffect(() => {
        const copy = [...typedCorrectly]
        copy[currentIndex] = true
        setTypedCorrectly(copy)
    }, [currentIndex])
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
                        <span className={charClass}>
                            {char}
                        </span>
                    </span>
                )
            })}
        </div>
    )
}

export default TypingBox
