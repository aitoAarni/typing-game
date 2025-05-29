import { User } from "../types/types"
import styles from "./UserInfo.module.scss"

interface UserInfoProps {
    user: User
}

const UserInfo = ({user}: UserInfoProps) => {
    return (
        <div className={styles.container}>
            <p className={styles.userInfo}> Username: {user.username}</p>
            <p className={styles.userInfo}>Email: {user.email}</p>
        </div>
    )
}

export default UserInfo