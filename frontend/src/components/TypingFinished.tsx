import styles from "./TypingFinished.module.scss"
import { TypingStatistics } from "./TypingView"

interface TypingFinishedProps {
    statistics: TypingStatistics | null
    typeAgain: () => void
}

const TypingFinished = ({ statistics, typeAgain }: TypingFinishedProps) => {
    return (
        <div className={styles.container}>
            {statistics && (
                <div>
                    <p className={styles.typingStat}>
                        accuracy {statistics.accuracy}%
                    </p>
                    <p className={styles.typingStat}>{statistics.wpm} wpm</p>
                    <p className={styles.typingStat}>{statistics.time} s</p>
                    <p className={styles.typingStat}>
                        {statistics.wordCount} words
                    </p>
                </div>
            )}
            <button onClick={() => typeAgain()}>New Text</button>
        </div>
    )
}

export default TypingFinished
