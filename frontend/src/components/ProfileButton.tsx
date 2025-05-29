import { useNavigate } from "react-router-dom"
import { Button2 } from "./Buttons"

const ProfileButton = () => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate("/profile")
    }
    return <div>
        <Button2 onClick={onClick}>Profile</Button2>
    </div>
}

export default ProfileButton