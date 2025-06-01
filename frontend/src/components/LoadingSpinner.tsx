import React from "react"
import styles from "./LoadingSpinner.module.scss"

interface LoadingSpinnerProps {
    style?: React.CSSProperties
}

const LoadingSpinner = ({ style }: LoadingSpinnerProps) => {
    return (
        <div
            className={styles.spinner}
            role="status"
            aria-label="Loading"
            style={style}
        ></div>
    )
}

export default LoadingSpinner
