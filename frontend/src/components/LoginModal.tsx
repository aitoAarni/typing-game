import styles from "./LoginModal.module.scss"
import loginGoogle from "../services/Login"
import useAuthUpdate from "../hooks/useAuthUpdate"
import { CredentialResponse } from "@react-oauth/google"
import LocalStorage from "../services/LocalStorageService"
import { GoogleLogin } from "@react-oauth/google"
import { useEffect } from "react"
import useTypingEnabled from "../hooks/useTypingEnabled"

interface LoginModalProps {
    closeModal: () => void
}

const LoginModal = ({ closeModal }: LoginModalProps) => {
    const authUpdate = useAuthUpdate()
    const { setTypingEnabled } = useTypingEnabled()
    useEffect(() => {
        setTypingEnabled(false)
        return () => {
            setTypingEnabled(true)
        }
    }, [])

    const handleLogin = async (credentials: CredentialResponse) => {
        try {
            const { token, user } = await loginGoogle(credentials)
            LocalStorage.setToken(token)
            LocalStorage.setUser(user)
            authUpdate()
        } catch (error) {
            console.error(error)
        }
    }

    const onError = () => {}
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
