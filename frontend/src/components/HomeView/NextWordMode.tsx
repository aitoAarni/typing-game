import { DefinitionServiceType } from "../../services/WordDefinitionService"
import styles from "./SwitchButtons.module.scss"

const NextWordModeSwitch = ({
    onClick,
    mode,
}: {
    onClick: (mode: DefinitionServiceType) => void
    mode: DefinitionServiceType
}) => {
    return (
        <div className={styles.modeContainer}>
            <button
                onClick={() => onClick("leitner")}
                className={
                    mode === "leitner" ? styles.buttonSelected : styles.button
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
    )
}

export default NextWordModeSwitch
