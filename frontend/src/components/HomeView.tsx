import TypingView from "./TypingView"
import styles from "./HomeView.module.scss"

const HomeView = () => {
    return (
        <div className={styles.container} data-testid="home-view">
            <TypingView />
        </div>
    )
}

export default HomeView
