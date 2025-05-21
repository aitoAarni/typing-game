import { CredentialResponse, GoogleLogin } from "@react-oauth/google"

const GoogleLoginComponent = () => {
    const onSuccess = (response: CredentialResponse) => {
        console.log("Login Success: currentUser:", response)
        console.log("credentialResponse", response.credential)
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
