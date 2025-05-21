import { API_URL } from "../config"
import LocalStorage from "./LocalStorageService"

const LoginGoogle = async (token: string) => {
    const url = API_URL + "/auth/google"
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
        }),
    })

    if (!response.ok) {
        throw new Error("Network error: " + response.statusText)
    }

    const data = await response.json()
    LocalStorage.setToken(data.token)
}

export default LoginGoogle
