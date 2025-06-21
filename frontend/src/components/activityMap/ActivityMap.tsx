import { TypingSessionActivity } from "../../types/types"
import { formatTime } from "../../utils"
import styles from "./ActivityMap.module.scss"

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const ActivityMap = ({
    typingActivity,
}: {
    typingActivity: TypingSessionActivity[]
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.daysContainer}>
                {daysOfWeek.map((day, index) => (
                    <p key={index} className={styles.day}>
                        {day}
                    </p>
                ))}
            </div>
            <div className={styles.activityContainer}>
                {typingActivity.map((_, index) => (
                    <Cell key={index} activity={typingActivity[index]} />
                ))}
            </div>
        </div>
    )
}

const Cell = ({ activity }: { activity: TypingSessionActivity }) => {
    const threshold = 0.05
    const hourDecimal = activity.total_seconds / 2000
    const alpha =
        hourDecimal > 1 ? 1 - threshold : Math.max(hourDecimal - threshold, 0)
    const color = "rgba(217, 255, 0, " + String(alpha + threshold) + ")"
    return (
        <div
            className={styles.cell}
            style={hourDecimal === 0 ? undefined : { backgroundColor: color }}
        >
            <div className={styles.onHover}>
                <p>
                    {formatTime(activity.total_seconds)} on{" "}
                    {activity.session_date.toLocaleDateString()}
                </p>
            </div>
        </div>
    )
}

export default ActivityMap
