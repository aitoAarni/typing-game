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
    const hourDecimal = activity.total_seconds / 240
    const alpha = hourDecimal > 1 ? 1 : hourDecimal
    const color = "rgba(255, 102, 255, " + String(alpha) + ")"
    return (
        <div
            className={styles.cell}
            style={alpha === 0 ? undefined : { backgroundColor: color }}
        ></div>
    )
}

export default ActivityMap
