import { useEffect, useState, useRef } from "react"
import styles from "./TypingBox.module.scss"

interface TypingBoxProps {
    text?: string
    textTyped: () => void
    calculateStatistics: (totalChars: number, errors: number) => void
    startTimer: () => void
}

const TypingBox = ({
    text,
    textTyped,
    calculateStatistics,
    startTimer,
}: TypingBoxProps) => {
    const lineHeight = 60
    const [frameNumber, setFrameNumber] = useState<number>(0)
    const [scrollOffset, setScrollOffset] = useState<number>(0)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)

    const correctCharsRef = useRef<number>(0)
    const totalErrorsRef = useRef<number>(0)
    const startedTypingRef = useRef<boolean>(false)
    const currentIndexRef = useRef<number[]>([0, 0])
    const charListRef = useRef<string[][]>([])
    const typedCorrectlyRef = useRef<(boolean | null)[][]>([])

    const keyPressed = (event: KeyboardEvent) => {
        if (
            typedCorrectlyRef.current.length === 0 ||
            charListRef.current.length === 0
        )
            return
        const char = event.key
        const currentIndex = currentIndexRef.current
        if (char.length === 1) {
            if (!startedTypingRef.current) {
                startTimer()
                startedTypingRef.current = true
            }
            typedCorrectlyRef.current[currentIndex[0]][currentIndex[1]] =
                char === charListRef.current[currentIndex[0]][currentIndex[1]]
            if (
                typedCorrectlyRef.current[currentIndex[0]][currentIndex[1]] ===
                false
            ) {
                totalErrorsRef.current += 1
            } else {
                correctCharsRef.current += 1
            }
            currentIndexRef.current = setNewIndex(
                currentIndex,
                charListRef.current
            )
        } else if (char === "Backspace") {
            if (currentIndex[1] === 0 && currentIndex[0] > 0) {
                currentIndex[0] = currentIndex[0] - 1
                currentIndex[1] =
                    charListRef.current[currentIndex[0]].length - 1
            } else if (currentIndex[1] > 0) {
                currentIndex[1] = currentIndex[1] - 1
            }
            typedCorrectlyRef.current[currentIndex[0]][currentIndex[1]] = null
            currentIndexRef.current = currentIndex
        }
        setFrameNumber(prev => prev + 1)
    }
    useEffect(() => {
        currentIndexRef.current = [0, 0]
        if (text?.length) {
            const [partitionedText, typedCorrectlyInitial] = partitionText(text)
            if (
                partitionedText.length > 0 &&
                typedCorrectlyInitial.length > 0
            ) {
                typedCorrectlyRef.current = typedCorrectlyInitial
                charListRef.current = partitionedText
            }
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            keyPressed(event)
        }
        window.addEventListener("keydown", handleKeyDown)
        setFrameNumber(prev => prev + 1)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [text])

    useEffect(() => {
        if (
            currentIndexRef.current[0] === charListRef.current.length - 1 &&
            currentIndexRef.current[1] ===
                charListRef.current[charListRef.current.length - 1].length
        ) {
            calculateStatistics(correctCharsRef.current, totalErrorsRef.current)
            textTyped()
        }
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
    }, [frameNumber])
    if (
        charListRef.current.length === 0 ||
        typedCorrectlyRef.current.length === 0
    ) {
        return (
            <div
                className={styles.container}
                data-testid="typing-container"
            ></div>
        )
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
                {charListRef.current.map((word, index0) => {
                    return (
                        <span key={index0} className={styles.wordContainer}>
                            {word.map((char, index1) => {
                                let caretClass = styles.noCaret
                                let caretTestId = "no-caret"
                                if (
                                    currentIndexRef.current[0] === index0 &&
                                    currentIndexRef.current[1] === index1
                                ) {
                                    caretClass = styles.caret
                                    caretTestId = "caret"
                                }
                                let charClass
                                let testId
                                if (
                                    typedCorrectlyRef.current[index0][index1] ==
                                    true
                                ) {
                                    charClass = styles.charCorrect
                                    testId = "char-correct"
                                } else if (
                                    typedCorrectlyRef.current[index0][index1] ==
                                    false
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
                                        <span
                                            className={caretClass}
                                            data-testid={caretTestId}
                                        ></span>
                                        <span
                                            className={charClass}
                                            data-testid={testId}
                                        >
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
const setNewIndex = (currentIndex: number[], charList: string[][]) => {
    if (currentIndex[1] + 1 < charList[currentIndex[0]].length) {
        return [currentIndex[0], currentIndex[1] + 1]
    } else if (currentIndex[0] + 1 < charList.length) {
        return [currentIndex[0] + 1, 0]
    } else {
        return [currentIndex[0], charList[currentIndex[0]].length]
    }
}

export default TypingBox
