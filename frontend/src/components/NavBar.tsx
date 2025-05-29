import useLoggedIn from "../hooks/useLoggedIn"
import LoginButton from "./LoginButton"
import styles from "./NavBar.module.scss"
import LogoutButton from "./LogoutButton"
import StatisticsButton from "./StatisticsButton"
import TypeButton from "./TypeButton"
import ProfileButton from "./ProfileButton"
const NavBar = () => {
    const loggedIn = useLoggedIn()
    return (
        <div className={styles.container}>
            <TypeButton />
            {loggedIn ? (
                <>
                    <StatisticsButton />
                    <ProfileButton />
                    <LogoutButton />
                </>
            ) : (
                <LoginButton />
            )}
        </div>
    )
}

export default NavBar
