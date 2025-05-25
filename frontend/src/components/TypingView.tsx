import { useEffect, useRef, useState } from "react"
import styles from "./TypingView.module.scss"
import TypingBox from "./TypingBox"
import TypingFinished from "./TypingFinished"
import WordDefinitionService from "../services/WordDefinitionService"
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
    const [typingTextLoading, setTypingTextLoading] = useState<boolean>(true)
    const [typingStatistics, setTypingStatistics] =
        useState<null | TypingStatistics>(null)

    const startTimeRef = useRef<number>(0)

    const turnTimerOn = () => {
        startTimeRef.current = new Date().getTime()
    }
    const { token } = useAuth()
    const calculateStatistics = async (totalChars: number, errors: number) => {
        if (!wordDefinition) return
        const endTime = new Date().getTime()
        const text = createTextFromDefinition(wordDefinition)
        const time = (endTime - startTimeRef.current) / 1000
        const textLength = text.length
        const words = text.split(/\s+/).length
        const wpm = Math.round((totalChars - errors) / 5 / (time / 60))
        const accuracy = (((totalChars - errors) / totalChars) * 100).toFixed(2)
        const statistics ={
            accuracy: accuracy,
            wpm: wpm,
            time: time,
            wordCount: words,
            errorCount: errors,
            correctChars: words,
            totalChars: textLength,
        } 
        setTypingStatistics(statistics)

    }

    useEffect(() => {
        const setNewText = async () => {
            setTypingTextLoading(true)
            const newDefinition = await definitionService.getNewDefinition()
            setWordDefinition(newDefinition)
            setTypingTextLoading(false)
        }
        const sendStatistics = async () => {
            if (!typingStatistics || !token) return
            const statistics = {
                total_characters: typingStatistics.totalChars,
                correct_characters: typingStatistics.correctChars,
                error_count: typingStatistics.errorCount,
                word_count: typingStatistics.wordCount,
                accuracy: Number(typingStatistics.accuracy),
                time_seconds: typingStatistics.time,
            }
            await sendTypingSession(statistics, token)
        }
        if (isTyping) {
            setNewText()
        } else {
            sendStatistics()
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
                />
            )}
            {typingTextLoading && <LoadingSpinner posY={270} />}
            {!isTyping && (
                <TypingFinished
                    wordDefinition={wordDefinition!}
                    statistics={typingStatistics}
                    typeAgain={() => setIsTyping(true)}
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
