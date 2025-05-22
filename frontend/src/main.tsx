import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./global.scss"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { OAuthID } from "./config.js"
import AuthProvider from "./contexts/AuthContext.js"

const container = document.getElementById("root")
if (!container) {
    throw new Error("Root container not found")
}

ReactDOM.createRoot(container).render(
    <GoogleOAuthProvider clientId={OAuthID}>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </GoogleOAuthProvider>
)
