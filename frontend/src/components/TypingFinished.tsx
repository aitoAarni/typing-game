import styles from './TypingFinished.module.scss'

interface TypingFinishedProps {
    statistics: {
        accuracy: number
        wpm: number
        time: number
    }
    typeAgain: () => void
}

const TypingFinished = ({statistics, typeAgain}: TypingFinishedProps) => {
    console.log("In typing finished")
    return (
        <div className={styles.container}>
            <p className={styles.typingStat}>{statistics.accuracy}</p>
            <p className={styles.typingStat}>{statistics.wpm}</p>
            <p className={styles.typingStat}>{statistics.time}</p>
            <button onClick={() => typeAgain()}>New Text</button>
        </div>
    ) 
}

export default TypingFinished