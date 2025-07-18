import Slider from "../Slider"
import styles from "./SwitchButtons.module.scss"
import useTypingEnabled from "../../hooks/useTypingEnabled"
import LocalStorage from "../../services/LocalStorageService"

interface AudioSwitchProps {
    onClick: React.Dispatch<React.SetStateAction<boolean>>
    audioOn: boolean
}

const AudioSwitch = ({ onClick, audioOn }: AudioSwitchProps) => {
    return (
        <div className={styles.modeContainer}>
            <button
                onClick={() => {
                    onClick(!audioOn)
                    LocalStorage.setAudioActive(!audioOn)
                }}
                className={
                    audioOn === true ? styles.buttonSelected : styles.button
                }
            >
                audio
            </button>
        </div>
    )
}

interface AudioSettingsProps {
    volume: number
    speed: number
    setVolume: (volume: number) => void
    setSpeed: (speed: number) => void
}

export const AudioSettings = ({
    volume,
    speed,
    setVolume,
    setSpeed,
}: AudioSettingsProps) => {
    const { setTypingEnabled } = useTypingEnabled()

    const onSpeedChange = (e: React.ChangeEvent<HTMLInputElement> | number) => {
        let newSpeed: number
        if (typeof e === "number") {
            newSpeed = e
        } else {
            newSpeed = clampValue(parseFloat(e.target.value), 0, 2.5)
        }
        setSpeed(newSpeed)
        if (!isNaN(newSpeed)) {
            LocalStorage.setAudioSpeed(newSpeed)
        }
    }

    const onVolumeChange = (
        e: React.ChangeEvent<HTMLInputElement> | number
    ) => {
        let newVolume: number
        if (typeof e === "number") {
            newVolume = e
        } else {
            newVolume = clampValue(parseFloat(e.target.value), 0, 1)
        }
        setVolume(newVolume)
        if (!isNaN(newVolume)) {
            LocalStorage.setAudioVolume(newVolume)
        }
    }

    return (
        <div
            className={styles.settingsBoard}
            onMouseEnter={() => setTypingEnabled(false)}
            onMouseLeave={() => setTypingEnabled(true)}
        >
            <div className={styles.sliderContainer}>
                <label>Volume</label>
                <Slider onChange={onVolumeChange} volume={volume} />
                <input
                    type="number"
                    value={volume}
                    onChange={onVolumeChange}
                    step="0.01"
                    min="0"
                    max="1"
                />
            </div>
            <div className={styles.sliderContainer}>
                <label>Speed</label>
                <Slider
                    onChange={onSpeedChange}
                    volume={speed}
                    min={0.75}
                    max={2}
                />
                <input
                    type="number"
                    value={speed}
                    onChange={onSpeedChange}
                    step="0.01"
                    min="0.75"
                    max="2"
                />
            </div>
        </div>
    )
}

const clampValue = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value))
}

export default AudioSwitch
