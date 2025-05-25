import { CredentialResponse } from "@react-oauth/google"
import { API_URL } from "../config"
import { AuthResponseSchema } from "../types/TypeGuards"

const loginGoogle = async (credentials: CredentialResponse) => {
    const url = API_URL + "/auth/google"
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ credentials: credentials.credential }),
    })

    if (!response.ok) {
        throw new Error("Network error: " + response.statusText)
    }
    const data = AuthResponseSchema.parse(await response.json())

    const user = {
        id: data.id,
        username: data.username,
        email: data.email,
    }

    return {
        token: data.token,
        user,
    }
}

export default loginGoogle
