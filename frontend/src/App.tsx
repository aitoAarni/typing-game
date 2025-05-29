import { Route, Routes } from "react-router-dom"
import HomeView from "./components/HomeView"
import NavBar from "./components/NavBar"
import StatisticsView from "./components/StatisticsView"
import SettingsView from "./components/SettingsView"
import ErrorBox from "./components/ErrorBox"
import useError from "./hooks/useError"

function App() {
    const { errorMessage, setErrorMessage } = useError()
    return (
        <div
            style={{ display: "flex", height: "100%", flexDirection: "column" }}
        >
            <NavBar />
            <ErrorBox errorText={errorMessage} setError={setErrorMessage} />
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/statistics" element={<StatisticsView />} />
                <Route path="/settings" element={<SettingsView />} />
            </Routes>
        </div>
    )
}

export default App
