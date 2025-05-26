import { Route, Routes } from "react-router-dom"
import HomeView from "./components/HomeView"
import NavBar from "./components/NavBar"
import StatisticsView from "./components/StatisticsView"

function App() {
    return (
        <div
            style={{ display: "flex", height: "100%", flexDirection: "column" }}
        >
            <NavBar />
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/statistics" element={<StatisticsView />} />
            </Routes>
        </div>
    )
}

export default App
