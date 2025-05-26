import { useNavigate } from "react-router-dom"
import { Button2 } from "./Buttons"

const TypeButton = () => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate("/")
    }
    return <Button2 onClick={onClick}>Type</Button2>
}

export default TypeButton
