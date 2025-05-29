import { useNavigate } from "react-router-dom"
import { Button2 } from "./Buttons"

const StatisticsButton = () => {
    const router = useNavigate()
    const onClick = () => {
        router("/statistics")
    }
    return (
        <div>
            <Button2 onClick={onClick}>Statisitcs</Button2>
        </div>
    )
}

export default StatisticsButton
