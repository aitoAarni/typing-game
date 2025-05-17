import React from "react"
import styles from "./LoadingSpinner.module.scss"

interface LoadingSpinnerProps {
    posX?: number
    posY?: number
}

const LoadingSpinner = ({ posX, posY }: LoadingSpinnerProps) => {
    const style: React.CSSProperties = {
        position:
            posX !== undefined || posY !== undefined ? "absolute" : undefined,
        left: posX,
        top: posY,
    }

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
