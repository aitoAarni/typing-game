import { use, useEffect, useRef, useState } from "react"
import styles from "./TypingView.module.scss"
import TypingBox from "./TypingBox"
import TypingFinished from "./TypingFinished"
import WordDefinitionService from "../services/WordDefinitionService"
import LoadingSpinner from "./LoadingSpinner"


interface TypingViewProps {
    textService: WordDefinitionService
}

export interface TypingStatistics {
    accuracy: number | string
    wpm: number
    time: number
    wordCount: number
    errorCount: number
}

const TypingView = ({ textService }: TypingViewProps) => {
    const [isTyping, setIsTyping] = useState<boolean>(true)
    const [typingText, setTypingText] = useState<string>("")
    const [typingTextLoading, setTypingTextLoading] = useState<boolean>(true)
    const [typingStatistics, setTypingStatistics] = useState<null | TypingStatistics>(null)

    const startTimeRef = useRef<number>(0)

    const turnTimerOn = () => {
        startTimeRef.current = new Date().getTime()
    }

    const calculateStatistics = (totalChars: number, errors: number) => {
        const endTime = new Date().getTime()
        const time = (endTime - startTimeRef.current) / 1000
        const words = typingText.split(/\s+/).length
        const wpm = Math.round(totalChars / 5 / (time / 60))
        const accuracy = ((totalChars - errors) / totalChars * 100).toFixed(2)
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
            const newText = await textService.getNewText()
            setTypingText(newText)
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
                    text={typingText}
                    textTyped={() => setIsTyping(false)}
                    calculateStatistics={calculateStatistics}
                    startTimer={turnTimerOn}
                />
            )}
            {typingTextLoading && <LoadingSpinner posY={270} />}
            {!isTyping && (
                <TypingFinished
                    statistics={typingStatistics}
                    typeAgain={() => setIsTyping(true)}
                />
            )}
        </div>
    )
}

export default TypingView
