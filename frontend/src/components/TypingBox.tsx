import { useEffect, useState, useRef } from "react"
import styles from "./TypingBox.module.scss"

interface TypingBoxProps {
    text?: string
    textTyped?: () => void
}

const TypingBox = ({ text, textTyped }: TypingBoxProps) => {
    const lineHeight = 60
    const [typedCorrectly, setTypedCorrectly] = useState<(boolean | null)[][]>(
        []
    )
    const [charList, setCharList] = useState<string[][]>([])
    const [currentIndex, setCurrentIndex] = useState<number[]>([0, 0])
    const [keyPressInt, setKeyPressInt] = useState<number>(0)
    const [scrollOffset, setScrollOffset] = useState<number>(0)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const currentCharRef = useRef<string>("")

    useEffect(() => {
        if (text?.length) {
            const [partitionedText, typedCorrectlyInitial] = partitionText(text)
            if (
                partitionedText.length > 0 &&
                typedCorrectlyInitial.length > 0
            ) {
                setTypedCorrectly(typedCorrectlyInitial)
                setCharList(partitionedText)
            }
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            currentCharRef.current = event.key
            setKeyPressInt(prev => prev + 1)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [text])

    useEffect(() => {
        if (typedCorrectly.length === 0 || charList.length === 0) return
        const char = currentCharRef.current
        const copy = [...typedCorrectly]
        if (char.length === 1) {
            copy[currentIndex[0]][currentIndex[1]] =
                char === charList[currentIndex[0]][currentIndex[1]]
            setCurrentIndex(prev => {
                if (prev[1] + 1 < charList[prev[0]].length) {
                    return [prev[0], prev[1] + 1]
                } else if (prev[0] + 1 < charList.length) {
                    return [prev[0] + 1, 0]
                } else {
                    if (textTyped) textTyped()
                    console.log("Finished typing")
                    return [prev[0], charList[prev[0]].length]
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
    useEffect(() => {

        if (isAnimating) return
        const container = document.querySelector(`.${styles.container}`)
        if (!container) return

        const caretElement = container.querySelector(`.${styles.caret}`)
        if (!caretElement) return

        const caretTop = caretElement.getBoundingClientRect().top
        const containerTop = container.getBoundingClientRect().top
        const relativeLine = Math.floor((caretTop - containerTop) / lineHeight)
        if (relativeLine >= 2) {
            setIsAnimating(true)
            setScrollOffset(prev => prev + lineHeight)
        } else if (relativeLine <= 0) {
            setIsAnimating(true)
            setScrollOffset(prev => prev - lineHeight)
        }
    }, [currentIndex])
    if (charList.length === 0 || typedCorrectly.length === 0) {
        return <div className={styles.container} data-testid="typing-container"></div>
    }
    return (
        <div className={styles.container} data-testid="typing-container">
            <div
                onTransitionEnd={() => setIsAnimating(false)}
                className={styles.inner}
                style={{ transform: `translateY(-${scrollOffset}px)` }}
            >
                <div
                    style={{
                        height: lineHeight,
                        width: "100%",
                    }}
                ></div>
                {charList.map((word, index0) => {
                    return (
                        <span key={index0} className={styles.wordContainer}>
                            {word.map((char, index1) => {
                                let caretClass = styles.noCaret
                                let caretTestId = "no-caret"
                                if (currentIndex[0] === index0 && currentIndex[1] === index1) {
                                    caretClass = styles.caret
                                    caretTestId = "caret"
                                }
                                let charClass
                                let testId
                                if (typedCorrectly[index0][index1] == true) {
                                    charClass = styles.charCorrect
                                    testId = "char-correct"

                                } else if (
                                    typedCorrectly[index0][index1] == false
                                ) {
                                    testId = "char-incorrect"
                                    charClass = styles.charIncorrect
                                } else {
                                    testId = "char-untyped"
                                    charClass = styles.charUntyped
                                }

                                return (
                                    <span
                                        key={index1}
                                        className={styles.charContainer}
                                    >
                                        <span className={caretClass} data-testid={caretTestId}></span>
                                        <span className={charClass} data-testid={testId}>
                                            {char === " " ? "\u00A0" : char}
                                        </span>
                                    </span>
                                )
                            })}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

const partitionText = (text: string): [string[][], (boolean | null)[][]] => {
    const words = text.trim().split(/\s+/)
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
