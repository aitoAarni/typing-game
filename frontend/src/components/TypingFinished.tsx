import { WordDefinition } from "../types/types"
import styles from "./TypingFinished.module.scss"
import { TypingStatistics } from "../types/types"
import { Button1 } from "./Buttons"

interface TypingFinishedProps {
    wordDefinition: WordDefinition
    nextWord: string
    statistics: TypingStatistics | null
    typeNext: () => void,
    typeAgain: () => void,
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
            {statistics && (
                <div className={styles.typingStatsContainer}>
                    <p className={styles.typingStat}>
                        accuracy {statistics.accuracy}%
                    </p>
                    <p className={styles.typingStat}>{statistics.wpm} wpm</p>
                    <p className={styles.typingStat}>{statistics.time} s</p>
                    <p className={styles.typingStat}>
                        {statistics.wordCount} words
                    </p>
                    <p className={styles.typingStat}>
                        misatkes {statistics.errorCount}
                    </p>
                </div>
            )}
            <p className={styles.nextWord}>Next word {nextWord}</p>
            <div className={styles.buttonContainer}>
                <Button1 onClick={typeAgain}>again</Button1>
                <Button1 onClick={typeNext}>next</Button1>
                <Button1 onClick={skipNext}>skip</Button1>
            </div>
        </div>
    )
}

export default TypingFinished
