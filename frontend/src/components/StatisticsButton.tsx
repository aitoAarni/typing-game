import { Button2 } from "./Buttons"
import styles from "./StatisticsButton.module.scss"

const StatisticsButton = () => {
    const onClick = () => {}
    return (
        <div className={styles.container}>
            <Button2 onClick={onClick}>Statisitcs</Button2>
        </div>
    )
}

export default StatisticsButton
