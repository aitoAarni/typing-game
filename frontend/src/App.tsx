import { Route, Routes } from "react-router-dom"
import HomeView from "./components/HomeView"

function App() {
    return (
        <div style={{ display: "flex", height: "100%" }}>
        <Routes>
            <Route path="/" element={<HomeView />} />
        </Routes>
        </div>
    )
}

export default App
