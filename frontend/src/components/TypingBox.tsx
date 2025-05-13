import { useEffect, useState, useRef } from "react"
import styles from "./TypingBox.module.scss"

interface TypingBoxProps {
    text?: string
}

const TypingBox = ({ text }: TypingBoxProps) => {
    const [charList, setCharList] = useState<string[][]>([])
    const [currentIndex, setCurrentIndex] = useState<number[]>([0, 0])
    const [typedCorrectly, setTypedCorrectly] = useState<(boolean | null)[][]>([])
    const [keyPressInt, setKeyPressInt] = useState<number>(0)
    const currentCharRef = useRef<string>("")
    useEffect(() => {
        if (text?.length) {
            const [partitionedText, typedCorrectlyInitial] = partitionText(text)
            setCharList(partitionedText)
            setTypedCorrectly(typedCorrectlyInitial)
        }

    }, [text])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            currentCharRef.current = event.key
            setKeyPressInt(prev => prev + 1)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    useEffect(() => {
        const char = currentCharRef.current
        const copy = [...typedCorrectly]
        if (char.length === 1) {
            copy[currentIndex[0]][currentIndex[1]] = char === charList[currentIndex[0]][currentIndex[1]]
            setCurrentIndex(prev => {
                if (prev[1] + 1 < charList[prev[0]].length - 1) {
                    return [prev[0], prev[1] + 1]
                } else if (prev[0] + 1 < charList.length) {
                    return [prev[0] + 1, 0]
                } else {
                    return [prev[0], prev[1] + 1]
                }
            })
        } else if (char === "Backspace") {
            if (currentIndex[1] === 0 && currentIndex[0] > 0) {
                currentIndex[0] = currentIndex[0] - 1
                currentIndex[1] = charList[currentIndex[0]].length - 1
            } else if (currentIndex[1] > 0) {
                currentIndex[1] = currentIndex[1] - 1
            }
            copy[currentIndex[0]][currentIndex[1]] = null
            setCurrentIndex([...currentIndex])
        }
        setTypedCorrectly(copy)
    }, [keyPressInt])

    return (
        <div className={styles.container}>
            {charList.map((word, index0) => {
                return (
                    <span>
                        
                {word.map((char, index1) => {
                    
                    const caretClass = currentIndex[0] === index0 && currentIndex[1] === index1 ? styles.caret : styles.noCaret
                    let charClass
                    if (typedCorrectly[index0][index1] == true) {
                        charClass = styles.charCorrect
                    } else if (typedCorrectly[index0][index1] == false) {
                        charClass = styles.charIncorrect
                    } else {
                        charClass = styles.charUntyped
                    }
                    
                    return (
                        <span key={index0 * 10000 + index1} className={styles.charContainer}>
                        <span className={caretClass}></span>
                        <span className={charClass}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    </span>
                    )
                    })
            }
            </span>
                )
            })}
        </div>
    )
}


const partitionText = (text: string): [string[][], (boolean | null)[][]] => {
    const words = text.split(" ")
    const partitionedText: string[][] = []
    const typedCorrectly: (boolean | null)[][] = []
    words.forEach((word, index) => {
        const chars = word.trim().split("")
        const nullInitializer = new Array(chars.length).fill(null)
        partitionedText.push(chars)
        typedCorrectly.push(nullInitializer)
        if (index !== words.length - 1) {
            partitionedText.push([" "])
            typedCorrectly.push([null])
        }

    })
    return [partitionedText, typedCorrectly]
}

export default TypingBox
