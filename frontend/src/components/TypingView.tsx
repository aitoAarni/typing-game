import { useEffect, useRef, useState } from "react"
import styles from "./TypingView.module.scss"
import TypingBox from "./TypingBox"
import TypingFinished from "./TypingFinished"
import { WordDefinitionService } from "../types/types"
import LoadingSpinner from "./LoadingSpinner"
import { WordDefinition } from "../types/types"
import { TypingStatistics } from "../types/types"
import useAuth from "../hooks/useAuth"
import { sendTypingSession } from "../services/TypingSessionService"

interface TypingViewProps {
    definitionService: WordDefinitionService
}

const TypingView = ({ definitionService }: TypingViewProps) => {
    const [isTyping, setIsTyping] = useState<boolean>(true)
    const [wordDefinition, setWordDefinition] = useState<WordDefinition | null>(
        null
    )
    const [nextWord, setNextWord] = useState<string>("")
    const [typingTextLoading, setTypingTextLoading] = useState<boolean>(true)
    const [typingStatistics, setTypingStatistics] =
        useState<null | TypingStatistics>(null)

    const startTimeRef = useRef<number>(0)

    const turnTimerOn = () => {
        startTimeRef.current = new Date().getTime()
    }
    const { token } = useAuth()
    const calculateStatistics = async (
        correctChars: number,
        errors: number
    ) => {
        if (!wordDefinition || correctChars + errors === 0) return
        const endTime = new Date().getTime()
        const text = createTextFromDefinition(wordDefinition)
        const time = (endTime - startTimeRef.current) / 1000
        const textLength = text.length
        const words = text.split(/\s+/).length
        const wpm = Math.round(correctChars / 5 / (time / 60))
        const accuracy = (
            (correctChars / (correctChars + errors)) *
            100
        ).toFixed(2)
        const statistics = {
            definition_id: wordDefinition.id,
            accuracy: accuracy,
            wpm: wpm,
            time: time,
            wordCount: words,
            errorCount: errors,
            correctChars,
            totalChars: textLength,
        }
        setTypingStatistics(statistics)
    }

    const typeNext = async () => {
        setTypingTextLoading(true)
        const newDefinition = await definitionService.getNewDefinition()
        setWordDefinition(newDefinition)
        setIsTyping(true)
        setTypingTextLoading(false)
    }

    const typeAgain = async () => {
        setTypingTextLoading(true)
        setIsTyping(true)
        const definition = await definitionService.getCurrentDefinition()
        setWordDefinition(definition)
        setTypingTextLoading(false)
    }

    const skipNext = async () => {
        await definitionService.updateNextDefinition()
        const nextDefinition = await definitionService.getNextDefinition()
        setNextWord(nextDefinition.word)
    }

    useEffect(() => {
        const setInitialDefinition = async () => {
            setTypingTextLoading(true)
            const definition = await definitionService.getCurrentDefinition()
            setWordDefinition(definition)
            setTypingTextLoading(false)
        }
        const sendStatistics = async () => {
            if (!typingStatistics || !token) return
            const statistics = {
                definition_id: typingStatistics.definition_id,
                total_characters: typingStatistics.totalChars,
                correct_characters: typingStatistics.correctChars,
                error_count: typingStatistics.errorCount,
                word_count: typingStatistics.wordCount,
                accuracy: Number(typingStatistics.accuracy),
                time_seconds: typingStatistics.time,
            }
            await sendTypingSession(statistics, token)
        }
        const updateNextWord = async () => {
            const nextDefinition = await definitionService.getNextDefinition()
            setNextWord(nextDefinition.word)
        }
        if (wordDefinition === null && isTyping) {
            setInitialDefinition()
        }
        if (!isTyping) {
            updateNextWord()

            if (typingStatistics && typingStatistics.wpm > 20) {
                sendStatistics()
            }
        }
    }, [isTyping])

    return (
        <div className={styles.container}>
            {isTyping && !typingTextLoading && (
                <TypingBox
                    text={createTextFromDefinition(wordDefinition)}
                    textTyped={() => setIsTyping(false)}
                    calculateStatistics={calculateStatistics}
                    startTimer={turnTimerOn}
                    nextText={typeNext}
                    retryText={typeAgain}
                />
            )}

            {typingTextLoading && (
                <LoadingSpinner style={{ left: "50%", top: "20%" }} />
            )}

            {!isTyping && (
                <TypingFinished
                    wordDefinition={wordDefinition!}
                    nextWord={nextWord}
                    statistics={typingStatistics}
                    typeNext={typeNext}
                    typeAgain={typeAgain}
                    skipNext={skipNext}
                />
            )}
        </div>
    )
}

const createTextFromDefinition = (definitionObject: WordDefinition | null) => {
    if (!definitionObject) return ""
    const string =
        definitionObject.word +
        ": " +
        definitionObject.definition +
        " - " +
        definitionObject.sentence
    return string
}

export default TypingView
