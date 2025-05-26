import { TypingSessionTotal } from "../types/types"
import styles from "./TotalTypingStatistics.module.scss"

interface TotalTypingStatisticsProps {
    typingStatistics: TypingSessionTotal
}

const TotalTypingStatistics = ({ typingStatistics }: TotalTypingStatisticsProps) => {
    return <view className={styles.container}>
      <span className={styles.statistic}>Sessions: {typingStatistics.total_sessions}</span>
      <span className={styles.statistic}>Correct characters{typingStatistics.total_correct_characters}</span>
      <span className={styles.statistic}>Total characters{typingStatistics.total_characters}</span>
      <span className={styles.statistic}>Total errors{typingStatistics.total_errors}</span>
      <span className={styles.statistic}>Total words{typingStatistics.total_words}</span>
      <span className={styles.statistic}>Accuracy: {typingStatistics.average_accuracy}</span>
      <span className={styles.statistic}>Total time: {typingStatistics.total_seconds}</span>
    </view>
}

export default TotalTypingStatistics