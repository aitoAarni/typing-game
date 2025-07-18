import { ChangeEvent } from "react"
import styles from "./Slider.module.scss"

interface SliderProps {
    step?: number
    min?: number
    max?: number
    volume: number
    onChange: (value: number) => void
}

const Slider = ({
    volume,
    onChange,
    step = 0.01,
    min = 0,
    max = 1,
}: SliderProps) => {
    const handleChange = (event: ChangeEvent<HTMLElement>) => {
        onChange(Number((event.target as HTMLInputElement).value))
    }

    return (
        <div className={styles.sliderContainer}>
            <input
                type="range"
                id="volume"
                min={min}
                max={max}
                step={step}
                value={volume}
                onChange={handleChange}
                className={styles.slider}
            />
        </div>
    )
}

export default Slider
