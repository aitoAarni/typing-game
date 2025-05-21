import TypingView from "./TypingView"
import styles from "./HomeView.module.scss"
import WordDefinitionService from "../services/WordDefinitionService"
import { getRemoteWordDefinition } from "../services/GetRemoteText"

const HomeView = () => {
    
    const wordDefinitionService = WordDefinitionService.newInstance(getRemoteWordDefinition)

    return (
        <div className={styles.container} data-testid="home-view">
            <TypingView definitionService={wordDefinitionService}/>
        </div>
    )
}

export default HomeView
