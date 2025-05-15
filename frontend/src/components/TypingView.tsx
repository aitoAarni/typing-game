import { useState } from "react"
import styles from "./TypingView.module.scss"
import TypingBox from "./TypingBox"

const text = "hello world"

const TypingView = () => {
    const [isTyping, setIsTyping] = useState<boolean>(true)
    return (<div className={styles.container}>
        {isTyping && <TypingBox text={text} textTyped={() => setIsTyping(false)}/>}
        {!isTyping && <div className={styles.finished}></div>}
    </div>
    )
}

export default TypingView