import { TypingSessionTotal } from "../types/types"
import Card from "./Card"
import styles from "./TotalTypingStatistics.module.scss"

interface TotalTypingStatisticsProps {
    typingStatistics: TypingSessionTotal | null
}

const TotalTypingStatistics = ({
    typingStatistics,
}: TotalTypingStatisticsProps) => {
    if (!typingStatistics) {
        return <div className={styles.container}>No statistics available</div>
    }
    return (
        <Card>
            <div className={styles.statsGrid}>
                <div className={styles.statistic}>
                    <span className={styles.label}>Texts typed</span>
                    <span className={styles.value}>
                        {typingStatistics.total_sessions}
                    </span>
                </div>
                <div className={styles.statistic}>
                    <span className={styles.label}>WPM</span>
                    <span className={styles.value}>
                        {calcWpm(
                            typingStatistics.total_correct_characters,
                            typingStatistics.total_seconds
                        )}
                    </span>
                </div>
                <div className={styles.statistic}>
                    <span className={styles.label}>Accuracy</span>
                    <span className={styles.value}>
                        {typingStatistics.average_accuracy.toFixed(2)}%
                    </span>
                </div>
                <div className={styles.statistic}>
                    <span className={styles.label}>Total Time</span>
                    <span className={styles.value}>
                        {formatTime(typingStatistics.total_seconds)}
                    </span>
                </div>
                <div className={styles.statistic}>
                    <span className={styles.label}>Correct Characters</span>
                    <span className={styles.value}>
                        {typingStatistics.total_correct_characters}
                    </span>
                </div>
                <div className={styles.statistic}>
                    <span className={styles.label}>Total Characters</span>
                    <span className={styles.value}>
                        {typingStatistics.total_characters}
                    </span>
                </div>
                <div className={styles.statistic}>
                    <span className={styles.label}>Total Errors</span>
                    <span className={styles.value}>
                        {typingStatistics.total_errors}
                    </span>
                </div>
                <div className={styles.statistic}>
                    <span className={styles.label}>Total Words</span>
                    <span className={styles.value}>
                        {typingStatistics.total_words}
                    </span>
                </div>
            </div>
        </Card>
    )
}

function formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${hours ? String(hours).padStart(2, "0") + "h" : ""}
    
    ${minutes ? String(minutes).padStart(2, "0") + "m" : ""} ${String(
        seconds
    ).padStart(2, "0")}s`
}

function calcWpm(correctChars: number, totalSeconds: number): number {
    if (totalSeconds === 0) return 0
    const totalMinutes = totalSeconds / 60
    return Math.round(correctChars / 5 / totalMinutes)
}

export default TotalTypingStatistics
