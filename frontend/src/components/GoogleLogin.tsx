import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
const GoogleLoginComponent = () => {
    const onSuccess = (response: CredentialResponse) => {
        console.log("Login Success: currentUser:", response)
        console.log("credentialResponse", response.credential)
        if (response.credential) {
            const decoded = jwtDecode(response.credential)
            console.log("Decoded JWT:", decoded)
        }
    }

    const onError = () => {
        console.log("Login Failed")
    }

    return (
        <view>
            <h2>Login</h2>
            <GoogleLogin onSuccess={onSuccess} onError={onError} />
        </view>
    )
}

export default GoogleLoginComponent
