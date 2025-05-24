import LoginButton from "./LoginButton"
import styles from "./NavBar.module.scss"

const NavBar = () => {
    return (
        <div className={styles.container}>
            <LoginButton />
        </div>
    )
}

export default NavBar