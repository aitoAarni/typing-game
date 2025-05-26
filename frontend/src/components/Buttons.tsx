import React from "react"
import styles from "./Buttons.module.scss"

interface Button1Props {
    children: React.ReactNode
    onClick: () => void
}
export const Button1 = ({ children, onClick }: Button1Props) => {
    return (
        <button className={styles.button1} onClick={onClick}>
            {children}
        </button>
    )
}

export const Button2 = ({ children, onClick }: Button1Props) => {
    return (
        <button className={styles.button2} onClick={onClick}>
            {children}
        </button>
    )
}