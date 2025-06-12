export const API_URL =
    import.meta.env.MODE === "development" ? "http://localhost:8080/api" : ""

export const OAuthID =
    import.meta.env.MODE === "development"
        ? "732089055389-thtclgrih0i7o6tsen7aqc2rsfqu4ufv.apps.googleusercontent.com"
        : ""
