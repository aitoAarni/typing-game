import { useEffect, useState, useRef, CSSProperties } from "react"
import styles from "./TypingBox.module.scss"
import useTypingEnabled from "../hooks/useTypingEnabled"
import WordAudioService from "../services/WordAudioService"
import { AudioUrlData } from "../types/types"

interface TypingBoxProps {
    text?: string
    getAudioUrlData: () => AudioUrlData | null
    textTyped: () => void
    calculateStatistics: (totalChars: number, errors: number) => void
    startTimer: () => void
    nextText: () => void
    retryText: () => void
}

const TypingBox = ({
    text,
    getAudioUrlData,
    textTyped,
    calculateStatistics,
    startTimer,
    nextText,
    retryText,
}: TypingBoxProps) => {
    const lineHeight = 60
    const [frameNumber, setFrameNumber] = useState<number>(0)
    const [scrollOffset, setScrollOffset] = useState<number>(0)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const [isFocused, setIsFocused] = useState<boolean>(true)

    const wordAudioServiceRef = useRef(new WordAudioService())
    const wordIndexesRef = useRef<number[]>([])
    const wordIndexAudioMappingRef = useRef<Record<number, number>>({})

    const correctCharsRef = useRef<number>(0)
    const totalErrorsRef = useRef<number>(0)
    const startedTypingRef = useRef<boolean>(false)
    const currentIndexRef = useRef<number[]>([0, 0])
    const charListRef = useRef<string[][]>([])
    const typedCorrectlyRef = useRef<(boolean | null)[][]>([])
    const controlPressedRef = useRef<boolean>(false)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const typingContainerRef = useRef<HTMLDivElement | null>(null)
    const { typingEnabled } = useTypingEnabled()
    const keyPressed = (event: KeyboardEvent) => {
        const char = event.key
        if (!typingEnabled) {
            return
        }
        if (char === "Control") {
            controlPressedRef.current = true
        } else if (char === "Enter") {
            nextText()
        } else if (char === "Escape") {
            retryText()
        }

        if (document.activeElement !== containerRef.current) {
            if (char.length === 1 && !controlPressedRef.current) {
                setIsFocused(true)
                containerRef.current?.focus()
            }
            return
        }
        if (
            typedCorrectlyRef.current.length === 0 ||
            charListRef.current.length === 0
        )
            return
        const currentIndex = currentIndexRef.current

        if (char.length === 1 && !controlPressedRef.current) {
            const charAtIndex =
                charListRef.current[currentIndex[0]][currentIndex[1]]
            if (!startedTypingRef.current) {
                startTimer()

                startedTypingRef.current = true
            }
            const correctChar = char === charAtIndex

            if (charAtIndex === " " && !correctChar) {
                totalErrorsRef.current += 1
            } else {
                typedCorrectlyRef.current[currentIndex[0]][currentIndex[1]] =
                    correctChar

                if (correctChar) {
                    correctCharsRef.current += 1
                } else {
                    totalErrorsRef.current += 1
                }

                playAudio(
                    currentIndexRef.current,
                    wordIndexesRef.current,
                    wordIndexAudioMappingRef.current,
                    wordAudioServiceRef.current
                )
                currentIndexRef.current = setNewIndex(
                    currentIndex,
                    charListRef.current
                )
            }
        } else if (char === "Backspace") {
            if (controlPressedRef.current) {
                controlAndBackspace()
            } else {
                if (currentIndex[1] === 0 && currentIndex[0] > 0) {
                    currentIndex[0] = currentIndex[0] - 1
                    currentIndex[1] =
                        charListRef.current[currentIndex[0]].length - 1
                } else if (currentIndex[1] > 0) {
                    currentIndex[1] = currentIndex[1] - 1
                }
                typedCorrectlyRef.current[currentIndex[0]][currentIndex[1]] =
                    null
                currentIndexRef.current = currentIndex
            }
        }
        setFrameNumber(prev => prev + 1)
    }

    const controlAndBackspace = () => {
        let wordIndex = currentIndexRef.current[0]
        const charIndex = currentIndexRef.current[1]
        const currentChar = charListRef.current[wordIndex][charIndex]
        if (wordIndex === 0 && charIndex === 0) return
        if (charIndex === 0 && currentChar !== " ") {
            wordIndex--
            typedCorrectlyRef.current[wordIndex][0] = null
        }
        if (charIndex === 0) {
            wordIndex--
        }
        const wordLength = charListRef.current[wordIndex].length
        for (let i = wordLength - 1; i >= 0; i--) {
            typedCorrectlyRef.current[wordIndex][i] = null
        }
        currentIndexRef.current = [wordIndex, 0]
    }
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            keyPressed(event)
        }
        const handleKeyUp = (event: KeyboardEvent) => {
            const key = event.key
            if (key === "Control") {
                controlPressedRef.current = false
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        setFrameNumber(prev => prev + 1)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [typingEnabled])

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
                wordIndexesRef.current = getWordIndexes(text)
                wordIndexAudioMappingRef.current = mapWordIndexesToAudio(
                    wordIndexesRef.current
                )
                const audioData = getAudioUrlData()
                if (audioData) {
                    const { definitionWord, words, definitionId } = audioData
                    wordAudioServiceRef.current.loadAudio(
                        definitionWord,
                        definitionId,
                        words
                    )
                }
            }
        }
        setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.focus()
                setIsFocused(true)
            }
        }, 50)
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
        const container = document.querySelector(`.${styles.typingContainer}`)
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
                className={styles.typingContainer}
                data-testid="typing-container"
            ></div>
        )
    }
    const handleFocus = () => {
        setIsFocused(true)
    }
    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <div
            ref={containerRef}
            className={styles.container}
            tabIndex={0}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {isFocused ? null : <BlurMessage />}
            <div
                className={styles.typingContainer}
                data-testid="typing-container"
                style={isFocused ? undefined : { filter: "blur(3px)" }}
            >
                <div
                    ref={typingContainerRef}
                    onTransitionEnd={() => setIsAnimating(false)}
                    className={styles.inner}
                    style={{
                        transform: `translateY(-${scrollOffset}px)`,
                    }}
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
                                        typedCorrectlyRef.current[index0][
                                            index1
                                        ] == true
                                    ) {
                                        charClass = styles.charCorrect
                                        testId = "char-correct"
                                    } else if (
                                        typedCorrectlyRef.current[index0][
                                            index1
                                        ] == false
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
            <div className={styles.hotkeyContainer}>
                <span className={styles.hotkey}>
                    <span className={styles.key}>Esc</span> - Retry
                </span>
                <span className={styles.hotkey}>
                    <span className={styles.key}>Enter</span> - Next
                </span>
            </div>
        </div>
    )
}

const BlurMessage = ({ style }: { style?: CSSProperties | undefined }) => {
    return (
        <div className={styles.blurContainer} style={style}>
            <p className={styles.blurText}>
                Click here or press a key to focus and start typing
            </p>
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

const getWordIndexes = (text: string) => {
    const words = text.trim().split(/\s+/)
    const wordIndexes: number[] = []
    let index = 0
    for (const word of words) {
        if (word.length > 1) {
            wordIndexes.push(index)
        } else if (word !== "-") {
            wordIndexes.push(index)
        }
        index += 2
    }
    return wordIndexes
}

const mapWordIndexesToAudio = (wordIndexes: number[]) => {
    const mapping: Record<number, number> = {}
    wordIndexes.forEach((index, i) => {
        mapping[index] = i
    })
    return mapping
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

const playAudio = (
    currentIndex: number[],
    wordIndexes: number[],
    wordIndexAudioMapping: Record<number, number>,
    wordAudioService: WordAudioService
) => {
    if (currentIndex[1] !== 0) return
    if (wordIndexes.includes(currentIndex[0])) {
        wordAudioService.addToQueue(wordIndexAudioMapping[currentIndex[0]])
    }
}

export default TypingBox
