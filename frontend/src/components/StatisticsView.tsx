import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { TypingSessionActivity, TypingSessionTotal } from "../types/types"
import {
    getTypingSession,
    getTypingSessionActivity,
} from "../services/TypingSessionService"
import LoadingSpinner from "./LoadingSpinner"
import TotalTypingStatistics from "./TotalTypingStatistics"
import styles from "./StatisticsView.module.scss"
import ActivityMap from "./activityMap/ActivityMap"
import { datesEqual } from "../utils"

const StatisticsView = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [statistics, setStatistics] = useState<TypingSessionTotal | null>(
        null
    )
    const [typingActivity, setTypingActivity] = useState<
        TypingSessionActivity[]
    >([])
    const { token } = useAuth()
    useEffect(() => {
        const getStatistics = async () => {
            if (token) {
                try {
                    setIsLoading(true)
                    const stats = await getTypingSession(token)
                    const incompleteTypingActivity =
                        await getTypingSessionActivity(token)

                    const startDate = new Date()
                    startDate.setUTCDate(startDate.getUTCDate() - 365)
                    startDate.setUTCDate(
                        startDate.getUTCDate() -
                            dayMapping[startDate.getUTCDay()]
                    )
                    const typingActivityFilled = fillTypingSessionActivityList(
                        startDate,
                        incompleteTypingActivity
                    )
                    setStatistics(stats)
                    setTypingActivity(typingActivityFilled)
                } finally {
                    setIsLoading(false)
                }
            } else {
                setStatistics(null)
                setIsLoading(false)
                setTypingActivity([])
            }
        }

        getStatistics()
    }, [token])

    return (
        <div className={styles.container}>
            {isLoading ? (
                <LoadingSpinner style={{ top: "20%" }} />
            ) : (
                <>
                    <TotalTypingStatistics typingStatistics={statistics} />
                    <ActivityMap typingActivity={typingActivity} />
                </>
            )}
        </div>
    )
}

const dayMapping = [6, 0, 1, 2, 3, 4, 5]

const fillTypingSessionActivityList = (
    startDate: Date,
    data: TypingSessionActivity[]
) => {
    const activityList: TypingSessionActivity[] = []
    const id = data.length > 0 ? data[0].user_id : null

    startDate.setUTCHours(0, 0, 0, 0)
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    let index = 0
    for (
        ;
        startDate <= today;
        startDate.setUTCDate(startDate.getUTCDate() + 1)
    ) {
        if (data[index] && datesEqual(data[index].session_date, startDate)) {
            activityList.push(data[index])
            index++
        } else {
            activityList.push({
                user_id: id,
                session_date: new Date(startDate),
                total_seconds: 0,
            })
        }
    }
    return activityList
}

export default StatisticsView
