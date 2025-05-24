import styles from "./LoginModal.module.scss"
import loginGoogle from "../services/Login"
import useAuthUpdate from "../hooks/useAuthUpdate"
import { CredentialResponse } from "@react-oauth/google"
import LocalStorage from "../services/LocalStorageService"
import { GoogleLogin } from "@react-oauth/google"

interface LoginModalProps {
    closeModal: () => void
}

const LoginModal = ({ closeModal }: LoginModalProps) => {
    console.log("LoginModal rendered")
    const authUpdate = useAuthUpdate()
    const handleLogin = async (credentials: CredentialResponse) => {
        console.log("Handling login with credentials:", credentials)
        try {
            const { token, user } = await loginGoogle(credentials)
            console.log("Login successful", { token, user })
            LocalStorage.setToken(token)
            LocalStorage.setUser(user)
            authUpdate()
        } catch (error) {
            console.error("Login failed", error)
        }
    }

    const onError = () => {
        console.log("Login Failed")
    }
    return (
        <div className={styles.container} onClick={closeModal}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeModal}>
                    close
                </button>
                <p className={styles.text}>Login with google</p>
                <GoogleLogin
                    containerProps={{ className: styles.google }}
                    onSuccess={handleLogin}
                    onError={onError}
                />
            </div>
        </div>
    )
}

export default LoginModal
