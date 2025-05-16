import TypingView from "./TypingView"
import styles from "./HomeView.module.scss"
import WordDefinitionService from "../services/WordDefinitionService"
import { getRemoteWordDefinition } from "../services/GetRemoteText"

const HomeView = () => {
    
    const textService = new WordDefinitionService(0, getRemoteWordDefinition)

    return (
        <div className={styles.container} data-testid="home-view">
            <TypingView textService={textService}/>
        </div>
    )
}

export default HomeView
