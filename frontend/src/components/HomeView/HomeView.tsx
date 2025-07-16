import TypingView from "../TypingView"
import styles from "./HomeView.module.scss"
import getDefinitionService, {
    DefinitionServiceType,
} from "../../services/WordDefinitionService"
import useAuth from "../../hooks/useAuth"
import LoadingSpinner from "../LoadingSpinner"
import { useEffect, useRef, useState } from "react"
import { WordDefinitionService } from "../../types/types"
import LocalStorage from "../../services/LocalStorageService"
import useLoggedIn from "../../hooks/useLoggedIn"
import AudioSwitch, { AudioSettings } from "./AudioSwitch"
import NextWordModeSwitch from "./NextWordMode"

const HomeView = () => {
    const [mode, setMode] = useState<DefinitionServiceType>(
        LocalStorage.getDefinitionMode()
    )
    const [audioOn, setAudioOn] = useState<boolean>(
        LocalStorage.getAudioActive()
    )
    const [audioVolume, setAudioVolume] = useState<number>(
        LocalStorage.getAudioVolume()
    )
    const [audioSpeed, setAudioSpeed] = useState<number>(
        LocalStorage.getAudioSpeed()
    )
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
                        <NextWordModeSwitch onClick={modeSwitch} mode={mode} />
                        <div className={styles.divider} />
                    </>
                )}
                <AudioSwitch onClick={setAudioOn} audioOn={audioOn} />
            </div>
            <div className={styles.settingsBoardContainer}>
                {audioOn && (
                    <AudioSettings
                        volume={audioVolume}
                        speed={audioSpeed}
                        setVolume={setAudioVolume}
                        setSpeed={setAudioSpeed}
                    />
                )}
            </div>
            {definitionServiceRef.current && !loading ? (
                <TypingView
                    key={mode + loggedIn}
                    definitionService={definitionServiceRef.current}
                    audioOn={audioOn}
                    audioSpeed={audioSpeed}
                    audioVolume={audioVolume}
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
