import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { TypingSessionTotal } from "../types/types"
import { getTypingSession } from "../services/TypingSessionService"
import LoadingSpinner from "./LoadingSpinner"
import TotalTypingStatistics from "./TotalTypingStatistics"
import styles from "./StatisticsView.module.scss"
import ActivityMap from "./activityMap/ActivityMap"

const StatisticsView = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [statistics, setStatistics] = useState<TypingSessionTotal | null>(
        null
    )
    const { token } = useAuth()
    useEffect(() => {
        const getStatistics = async () => {
            if (token) {
                try {
                    setIsLoading(true)
                    const stats = await getTypingSession(token)
                    setStatistics(stats)
                } finally {
                    setIsLoading(false)
                }
            } else {
                setStatistics(null)
                setIsLoading(false)
            }
        }
        getStatistics()
    }, [token])

    return (
        <div className={styles.container}>
            {isLoading ? (
                <LoadingSpinner style={{top: "20%"}} />
            ) : (
                <>
                <TotalTypingStatistics typingStatistics={statistics} />
                <ActivityMap />
                </>
            )}
        </div>
    )
}

export default StatisticsView
