import TypingView from "./TypingView"
import styles from "./HomeView.module.scss"
import getDefinitionService from "../services/WordDefinitionService"
import useAuth from "../hooks/useAuth"
import LoadingSpinner from "./LoadingSpinner"
import { useEffect, useState } from "react"
import { WordDefinitionService } from "../types/types"

const HomeView = () => {
    const [mode, setMode] = useState<"sequential" | "leitner">("sequential")
    const [definitionService, setDefinitionService] =
        useState<WordDefinitionService | null>(null)
    const { token } = useAuth()
    useEffect(() => {
        const updateDefinitionService = async () => {
            if (token) {
                const definitionServiceResolved = await getDefinitionService(
                    mode,
                    token
                )
                setDefinitionService(definitionServiceResolved)
            } else {
                const definitionServiceResolved = await getDefinitionService(
                    "sequential"
                )

                setDefinitionService(definitionServiceResolved)
            }
        }
        updateDefinitionService()
    }, [mode, token])


    return (
        <div className={styles.container} data-testid="home-view">
            {definitionService ? (
                <TypingView definitionService={definitionService} />
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
