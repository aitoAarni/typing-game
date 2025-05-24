import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import loginGoogle from "../services/Login"
import useAuthUpdate from "../hooks/useAuthUpdate"
import useAuth from "../hooks/useAuth"
import LocalStorage from "../services/LocalStorageService"
const GoogleLoginComponent = () => {
    const authUpdate = useAuthUpdate()
    const { user, token } = useAuth()
    const handleLogin = async (credentials: CredentialResponse) => {
        try {
            const { token, user } = await loginGoogle(credentials)
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
        <view>
            <h2>Login</h2>
            <GoogleLogin onSuccess={handleLogin} onError={onError} />
            {user && token ? (
                <div>
                    <h3>Welcome, {user.username}</h3>
                    <p>Email: {user.email}</p>
                    <p>Token: {token}</p>
                </div>
            ) : (
                <div>
                    <h3>Please log in</h3>
                    <p>You are not logged in.</p>
                    <p>Token: {token}</p>
                </div>
            )}
        </view>
    )
}

export default GoogleLoginComponent
