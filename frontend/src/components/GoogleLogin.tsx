import { GoogleLogin } from "@react-oauth/google"
import LoginGoogle from "../services/Login"
const GoogleLoginComponent = () => {
    

    const onError = () => {
        console.log("Login Failed")
    }

    return (
        <view>
            <h2>Login</h2>
            <GoogleLogin onSuccess={LoginGoogle} onError={onError} />
        </view>
    )
}

export default GoogleLoginComponent
