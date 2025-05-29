import styles from "./ErrorBox.module.scss"
import { useEffect } from "react"

interface ErrorBoxProps {
    errorText: string | null
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

const ErrorBox = ({ errorText, setError }: ErrorBoxProps) => {
    useEffect(() => {
        if (errorText) {
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }, [errorText])

    console.log("errroriii message: ", errorText)
    return !errorText ? null : (
        <div
            onClick={() => {
                setError(null)
            }}
            className={styles.container}
        >
            <p className={styles.text}>{errorText}</p>
        </div>
    )
}

export default ErrorBox
