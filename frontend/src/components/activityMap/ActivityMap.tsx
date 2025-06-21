import { TypingSessionActivity } from "../../types/types"
import styles from "./ActivityMap.module.scss"

const ActivityMap = ({
    typingActivity,
}: {
    typingActivity: TypingSessionActivity[]
}) => {
    return (
        <div className={styles.container}>
            {typingActivity.map((_, index) => (
                <Cell key={index} activity={typingActivity[index]} />
            ))}
        </div>
    )
}

const Cell = ({ activity }: { activity: TypingSessionActivity }) => {
    const d1 = new Date()
    d1.setDate(d1.getDate() - 7)

    const threshold = 0.05
    const hourDecimal = activity.total_seconds / 2000
    const alpha =
        hourDecimal > 1 ? 1 - threshold : Math.max(hourDecimal - threshold, 0)
    const color = "rgba(217, 255, 0, " + String(alpha + threshold) + ")"
    return (
        <div
            className={styles.cell}
            style={hourDecimal === 0 ? undefined : { backgroundColor: color }}
        ></div>
    )
}

export default ActivityMap
