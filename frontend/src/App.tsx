import { Route, Routes } from "react-router-dom"
import HomeView from "./components/HomeView"
import GoogleLoginComponent from "./components/GoogleLogin"

function App() {
    return (
        <div style={{ display: "flex", height: "100%" }}>
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<GoogleLoginComponent />} />
        </Routes>
        </div>
    )
}

export default App
