import styles from "./ActivityMap.module.scss"

const ActivityMap = () => {
    const data = new Array(365).fill(null)
    return (
        <div className={styles.container}>
            {data.map((_, index) => (
                <Cell key={index} />
            ))}
        </div>
    )
}

const Cell = () => {
    return <div className={styles.cell}></div>
}

export default ActivityMap
