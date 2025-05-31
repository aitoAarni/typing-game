import { WordDefinition } from "../types/types"
import styles from "./TypingFinished.module.scss"
import { TypingStatistics } from "../types/types"
import { Button1 } from "./Buttons"
import { useEffect } from "react"
import useTypingEnabled from "../hooks/useTypingEnabled"

interface TypingFinishedProps {
    wordDefinition: WordDefinition
    nextWord: string
    statistics: TypingStatistics | null
    typeNext: () => void
    typeAgain: () => void
    skipNext: () => void
}

const TypingFinished = ({
    wordDefinition,
    nextWord,
    statistics,
    typeNext,
    typeAgain,
    skipNext,
}: TypingFinishedProps) => {
    const { typingEnabled } = useTypingEnabled()
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key
            if (!typingEnabled) return
            switch (key) {
                case "Enter":
                    typeNext()
                    break
                case " ":
                    skipNext()
                    break
                case "r":
                    typeAgain()
                    break
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [typingEnabled])
    return (
        <div className={styles.container}>
            <div className={styles.wordDefinitionContainer}>
                <h2 className={styles.wordDefinition}>{wordDefinition.word}</h2>
                <p className={styles.wordDefinition}>
                    {wordDefinition.definition}
                </p>
                <p className={styles.wordDefinition}>
                    {wordDefinition.sentence}
                </p>
            </div>
            <div className={styles.cardContainer}>
                {statistics && (
                    <div className={styles.typingStatsContainer}>
                        <div className={styles.statistic}>
                            <span className={styles.label}>WPM</span>
                            <span className={styles.value}>
                                {statistics.wpm}
                            </span>
                        </div>
                        <div className={styles.statistic}>
                            <span className={styles.label}>Accuracy</span>
                            <span className={styles.value}>
                                {statistics.accuracy}%
                            </span>
                        </div>
                        <div className={styles.statistic}>
                            <span className={styles.label}>Time</span>
                            <span className={styles.value}>
                                {statistics.time} s
                            </span>
                        </div>
                        <div className={styles.statistic}>
                            <span className={styles.label}>Words</span>
                            <span className={styles.value}>
                                {statistics.wordCount}
                            </span>
                        </div>
                        <div className={styles.statistic}>
                            <span className={styles.label}>Mistakes</span>
                            <span className={styles.value}>
                                {statistics.errorCount}
                            </span>
                        </div>
                    </div>
                )}
                <p className={styles.nextWord}>Next word - {nextWord}</p>
                <div className={styles.buttonContainer}>
                    <div className={styles.buttonGroup}>
                        <Button1 onClick={typeAgain}>retry</Button1>
                        <span className={styles.hotkey}>
                            <span className={styles.key}>R</span> - Retry
                        </span>
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button1 onClick={typeNext}>next</Button1>
                        <span className={styles.hotkey}>
                            <span className={styles.key}>Enter</span> - Next
                        </span>
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button1 onClick={skipNext}>skip</Button1>
                        <span className={styles.hotkey}>
                            <span className={styles.key}>Space</span> - Skip
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TypingFinished
