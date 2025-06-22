import React from "react"
import styles from "./Card.module.scss"
interface CardProps {
    children: React.ReactNode
    style?: React.CSSProperties
}

const Card = ({ children, style }: CardProps) => {
    return <div style={style} className={styles.container}>{children}</div>
}

export default Card
