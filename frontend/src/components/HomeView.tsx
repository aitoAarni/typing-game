import TypingView from "./TypingView"
import styles from "./HomeView.module.scss"
import getDefinitionService from "../services/WordDefinitionService"
import useAuth from "../hooks/useAuth"
import LoadingSpinner from "./LoadingSpinner"
import { useEffect, useRef, useState } from "react"
import { WordDefinitionService } from "../types/types"
import LocalStorage from "../services/LocalStorageService"

const HomeView = () => {
    const [mode, setMode] = useState<"sequential" | "leitner">(
        LocalStorage.getDefinitionMode
    )
    const [loading, setLoading] = useState<boolean>(true)

    const definitionServiceRef = useRef<WordDefinitionService | null>(null)

    const { token } = useAuth()
    useEffect(() => {
        const updateDefinitionService = async () => {
            LocalStorage.setDefinitionMode(mode)
            if (token) {
                const definitionServiceResolved = await getDefinitionService(
                    mode,
                    token
                )
                definitionServiceRef.current = definitionServiceResolved
            } else {
                const definitionServiceResolved = await getDefinitionService(
                    "sequential"
                )

                definitionServiceRef.current = definitionServiceResolved
            }
            setLoading(false)
        }
        updateDefinitionService()
    }, [mode, token])

    const onClick = (mode: "leitner" | "sequential") => {
        setLoading(true)
        setMode(mode)
    }

    return (
        <div className={styles.container} data-testid="home-view">
            <div className={styles.dashboard}>
                <div className={styles.modeContainer}>
                    <button
                        onClick={() => onClick("leitner")}
                        className={
                            mode === "leitner"
                                ? styles.buttonSelected
                                : styles.button
                        }
                    >
                        smart
                    </button>
                    <button
                        onClick={() => onClick("sequential")}
                        className={
                            mode === "sequential"
                                ? styles.buttonSelected
                                : styles.button
                        }
                    >
                        sequential
                    </button>
                </div>
            </div>
            {definitionServiceRef.current && !loading ? (
                <TypingView
                    key={mode}
                    definitionService={definitionServiceRef.current}
                />
            ) : (
                <LoadingSpinner
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}
        </div>
    )
}

export default HomeView
