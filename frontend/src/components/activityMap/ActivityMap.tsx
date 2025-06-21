import { TypingSessionActivity } from "../../types/types"
import styles from "./ActivityMap.module.scss"

const ActivityMap = ({
    typingActivity,
}: {
    typingActivity: TypingSessionActivity[]
}) => {
    console.log("ActivityMap", typingActivity)
    return (
        <div className={styles.container}>
            {typingActivity.map((_, index) => (
                <Cell key={index} activity={typingActivity[index]} />
            ))}
        </div>
    )
}

const Cell = ({ activity }: { activity: TypingSessionActivity }) => {
    const threshold = 0.2
    const hourDecimal = activity.total_seconds / 3600
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
