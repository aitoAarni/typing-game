import styles from './TypingFinished.module.scss'

interface TypingFinishedProps {
    statistics: {
        accuracy: number
        wpm: number
        time: number
        wordCount: number
         
    }
    typeAgain: () => void
}

const TypingFinished = ({statistics, typeAgain}: TypingFinishedProps) => {
    return (
        <div className={styles.container}>
            <p className={styles.typingStat}>accuracy {statistics.accuracy}%</p>
            <p className={styles.typingStat}>{statistics.wpm} wpm</p>
            <p className={styles.typingStat}>{statistics.time} s</p>
            <p className={styles.typingStat}>{statistics.wordCount} words</p>
            <button onClick={() => typeAgain()}>New Text</button>
        </div>
    ) 
}

export default TypingFinished