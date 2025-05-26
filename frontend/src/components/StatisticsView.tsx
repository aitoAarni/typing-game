import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { TypingSessionTotal } from "../types/types"
import { getTypingSession } from "../services/TypingSessionService"
import LoadingSpinner from "./LoadingSpinner"
import TotalTypingStatistics from "./TotalTypingStatistics"
import styles from "./StatisticsView.module.scss"

const StatisticsView = () => {
    const [statistics, setStatistics] = useState<TypingSessionTotal | null>(
        null
    )
    const { token } = useAuth()
    useEffect(() => {
        const getStatistics = async () => {
            if (token) {
                const stats = await getTypingSession(token)
                setStatistics(stats)
            }
        }
        getStatistics()
    }, [token])

    return (
        <div className={styles.container}>
            {statistics ? (
                <TotalTypingStatistics typingStatistics={statistics} />
            ) : (
                <LoadingSpinner posX={100} posY={100} />
            )}
        </div>
    )
}

export default StatisticsView
