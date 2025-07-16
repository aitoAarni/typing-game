import { useState } from "react"
import Slider from "../Slider"
import styles from "./SwitchButtons.module.scss"

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

export const AudioSettings = () => {
    const [volume, setVolume] = useState<number>(0.5)
    return (
        <div className={styles.settingsBoard}>
            <Slider onChange={setVolume} volume={volume} />
        </div>
    )
}

export default AudioSwitch
