import { Route, BrowserRouter, Routes } from "react-router-dom"
import HomeView from "./components/HomeView"
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeView />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
