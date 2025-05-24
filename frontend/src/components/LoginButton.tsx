import styles from "./LoginButton.module.scss"
import { useState } from "react"
import LoginModal from "./LoginModal"

const LoginButton = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={openModal}>
                Login
            </button>
            {modalOpen && <LoginModal closeModal={closeModal} />}
        </div>
    )
}

export default LoginButton
