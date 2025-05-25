import { useEffect, useRef, useState } from "react"
import styles from "./TypingView.module.scss"
import TypingBox from "./TypingBox"
import TypingFinished from "./TypingFinished"
import WordDefinitionService from "../services/WordDefinitionService"
import LoadingSpinner from "./LoadingSpinner"
import { WordDefinition } from "../types/types"
import { TypingStatistics } from "../types/types"

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

    const calculateStatistics = (totalChars: number, errors: number) => {
        if (!wordDefinition) return
        const text = createTextFromDefinition(wordDefinition)
        const endTime = new Date().getTime()
        const time = (endTime - startTimeRef.current) / 1000
        const words = text.split(/\s+/).length
        const wpm = Math.round((totalChars - errors) / 5 / (time / 60))
        const accuracy = (((totalChars - errors) / totalChars) * 100).toFixed(2)
        setTypingStatistics({
            accuracy: accuracy,
            wpm: wpm,
            time: time,
            wordCount: words,
            errorCount: errors,
        })
    }

    useEffect(() => {
        const setNewText = async () => {
            setTypingTextLoading(true)
            const newDefinition = await definitionService.getNewDefinition()
            setWordDefinition(newDefinition)
            setTypingTextLoading(false)
        }
        if (isTyping) {
            setNewText()
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
