import useAuth from "../hooks/useAuth"
import styles from "./SettingsView.module.scss"
import UserInfo from "./UserInfo"

const SettingsView = () => {
    const { user } = useAuth()
    return (
        <div className={styles.container}>
            <p className={styles.settings}> Settings </p>
            {user && <UserInfo user={user} />}
        </div>
    )
}

export default SettingsView
