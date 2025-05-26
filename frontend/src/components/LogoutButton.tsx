import useAuthUpdate from "../hooks/useAuthUpdate"
import LocalStorage from "../services/LocalStorageService"
import { Button2 } from "./Buttons"
import styles from "./LogoutButton.module.scss"

const LogoutButton = () => {
    const authUpdate = useAuthUpdate()
    const handleLogout = () => {
        LocalStorage.removeToken()
        LocalStorage.removeUser()
        authUpdate()
    }

    return (
        <div className={styles.container}>
            <Button2 onClick={handleLogout}>
                Logout
            </Button2>
        </div>
    )
}

export default LogoutButton
