import TypingView from "./TypingView"
import styles from "./HomeView.module.scss"
import getDefinitionService, {
    DefinitionServiceType,
} from "../services/WordDefinitionService"
import useAuth from "../hooks/useAuth"
import LoadingSpinner from "./LoadingSpinner"
import { useEffect, useRef, useState } from "react"
import { WordDefinitionService } from "../types/types"
import LocalStorage from "../services/LocalStorageService"
import useLoggedIn from "../hooks/useLoggedIn"

const HomeView = () => {
    const [mode, setMode] = useState<DefinitionServiceType>(
        // LocalStorage.getDefinitionMode()
        "sequential"
    )
    const [audioMode, setAudioMode] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const definitionServiceRef = useRef<WordDefinitionService | null>(null)

    const { token } = useAuth()
    const loggedIn = useLoggedIn()
    useEffect(() => {
        const updateDefinitionService = async () => {
            if (loggedIn) {
                LocalStorage.setDefinitionMode(mode)
            }
            if (token && loggedIn) {
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

    const modeSwitch = (mode: DefinitionServiceType) => {
        setLoading(true)
        setMode(mode)
    }

    return (
        <div className={styles.container} data-testid="home-view">
            <div className={styles.dashboard}>
                {loggedIn && (
                    <>
                        <ModeSwitch onClick={modeSwitch} mode={mode} />
                        <div className={styles.divider} />
                    </>
                )}
                <AudioSwitch onClick={setAudioMode} audioMode={audioMode} />
            </div>
            {definitionServiceRef.current && !loading ? (
                <TypingView
                    key={mode + loggedIn}
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

const ModeSwitch = ({
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

interface AudioSwitchProps {
    onClick: React.Dispatch<React.SetStateAction<boolean>>
    audioMode: boolean
}

const AudioSwitch = ({ onClick, audioMode }: AudioSwitchProps) => {
    return (
        <div className={styles.modeContainer}>
            <button
                onClick={() => {
                    onClick(!audioMode)
                }}
                className={
                    audioMode === true ? styles.buttonSelected : styles.button
                }
            >
                audio
            </button>
        </div>
    )
}

export default HomeView
