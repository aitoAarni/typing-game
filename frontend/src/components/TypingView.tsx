import { useState } from "react"
import styles from "./TypingView.module.scss"
import TypingBox from "./TypingBox"
import TypingFinished from "./TypingFinished"

const text = "hello world"

const TypingView = () => {
    const [isTyping, setIsTyping] = useState<boolean>(true)
    console.log("Is typing", isTyping)
    return (
        <div className={styles.container}>
            {isTyping && (
                <TypingBox text={text} textTyped={() => setIsTyping(false)} />
            )}
            {!isTyping && (
                <TypingFinished
                    statistics={{ accuracy: 100, wpm: 100, time: 10, wordCount: 2 }}
                    typeAgain={() => setIsTyping(true)}
                />
            )}
        </div>
    )
}

export default TypingView
