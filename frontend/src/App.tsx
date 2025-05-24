import { Route, Routes } from "react-router-dom"
import HomeView from "./components/HomeView"
import GoogleLoginComponent from "./components/GoogleLogin"
import NavBar from "./components/NavBar"

function App() {
    return (
        <div
            style={{ display: "flex", height: "100%", flexDirection: "column" }}
        >
            <NavBar />
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/login" element={<GoogleLoginComponent />} />
            </Routes>
        </div>
    )
}

export default App
