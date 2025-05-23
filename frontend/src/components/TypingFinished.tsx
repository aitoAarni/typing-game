import { WordDefinition } from "../types/types"
import styles from "./TypingFinished.module.scss"
import { TypingStatistics } from "./TypingView"

interface TypingFinishedProps {
    wordDefinition: WordDefinition
    statistics: TypingStatistics | null
    typeAgain: () => void
}

const TypingFinished = ({
    wordDefinition,
    statistics,
    typeAgain,
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
                    <p className={styles.typingStat}>misatkes {statistics.errorCount}</p>
                </div>
            )}
            <button className={styles.button} onClick={() => typeAgain()}>next</button>
        </div>
    )
}

export default TypingFinished
