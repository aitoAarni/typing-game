import { useState } from "react"
import LoginModal from "./LoginModal"
import { Button2 } from "./Buttons"

const LoginButton = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    return (
        <div >
            <Button2 onClick={openModal}>
                Login
            </Button2>
            {modalOpen && <LoginModal closeModal={closeModal} />}
        </div>
    )
}

export default LoginButton
