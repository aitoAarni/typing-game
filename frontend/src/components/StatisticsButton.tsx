import { useNavigate } from "react-router-dom"
import { Button2 } from "./Buttons"
import styles from "./StatisticsButton.module.scss"

const StatisticsButton = () => {
    const router = useNavigate()
    const onClick = () => {
        router("/statistics")
    }
    return (
        <div className={styles.container}>
            <Button2 onClick={onClick}>Statisitcs</Button2>
        </div>
    )
}

export default StatisticsButton
