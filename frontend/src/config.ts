export const API_URL: string =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000"
        : import.meta.env.VITE_API_URL

export const OAuthID: string =
    import.meta.env.MODE === "development"
        ? "732089055389-thtclgrih0i7o6tsen7aqc2rsfqu4ufv.apps.googleusercontent.com"
        : "732089055389-thtclgrih0i7o6tsen7aqc2rsfqu4ufv.apps.googleusercontent.com"

export const AUDIO_API_URL = import.meta.env.VITE_AUDIO_API_URL
