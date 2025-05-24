import useAuthUpdate from "../hooks/useAuthUpdate"
import LocalStorage from "../services/LocalStorageService"
import styles from "./LogoutButton.module.scss"

const LogoutButton = () => {
    const authUpdate = useAuthUpdate()
    const handleLogout = () => {
        LocalStorage.removeToken()
        LocalStorage.removeUser()
        authUpdate()
    }

    return (
        <button onClick={handleLogout} className={styles.button}>
            Logout
        </button>
    )
}

export default LogoutButton
