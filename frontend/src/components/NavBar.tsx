import useLoggedIn from "../hooks/useLoggedIn"
import LoginButton from "./LoginButton"
import styles from "./NavBar.module.scss"
import LogoutButton from "./LogoutButton"
const NavBar = () => {
    const loggedIn = useLoggedIn()
    return (
        <div className={styles.container}>
            {loggedIn ? <LogoutButton /> : <LoginButton />}
        </div>
    )
}

export default NavBar
