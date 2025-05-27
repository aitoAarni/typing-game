import React from "react"
import styles from "./Card.module.scss"
interface CardProps {
    children: React.ReactNode
}

const Card = ({ children }: CardProps) => {
    return <div className={styles.container}>{children}</div>
}

export default Card
