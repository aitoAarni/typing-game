import TypingView from "./TypingView"
import styles from "./HomeView.module.scss"
import { LeitnerWordDefinitionService } from "../services/WordDefinitionService"
import { getRemoteWordDefinitionLeitner } from "../services/GetRemoteText"
import useAuth from "../hooks/useAuth"
import LoadingSpinner from "./LoadingSpinner"

const HomeView = () => {
    const { token } = useAuth()
    if (!token) {
        return (
            <div className={styles.container}>
                <LoadingSpinner
                    style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            </div>
        )
    }
    const fetchWordDefinition = getRemoteWordDefinitionLeitner(token)
    const wordDefinitionService =
        LeitnerWordDefinitionService.newInstance(fetchWordDefinition)

    return (
        <div className={styles.container} data-testid="home-view">
            token
            <TypingView definitionService={wordDefinitionService} />
        </div>
    )
}

export default HomeView
