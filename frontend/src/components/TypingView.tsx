import { useEffect, useState } from "react"
import styles from "./TypingView.module.scss"
import TypingBox from "./TypingBox"
import TypingFinished from "./TypingFinished"
import WordDefinitionService from "../services/WordDefinitionService"

//const text = "hello world"

interface TypingViewProps {
    textService: WordDefinitionService
}

const TypingView = ({ textService }: TypingViewProps) => {
    const [isTyping, setIsTyping] = useState<boolean>(true)
    const [typingText, setTypingText] = useState<string>("")
    const [typingTextLoading, setTypingTextLoading] = useState<boolean>(true)

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
                />
            )}
            {!isTyping && (
                <TypingFinished
                    statistics={{
                        accuracy: 100,
                        wpm: 100,
                        time: 10,
                        wordCount: 2,
                    }}
                    typeAgain={() => setIsTyping(true)}
                />
            )}
        </div>
    )
}

export default TypingView
