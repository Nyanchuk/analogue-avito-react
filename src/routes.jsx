import { Routes, Route } from "react-router-dom"
import { Main } from "./pages/main";
import { Myprofile } from "./pages/myprofile";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/profile" element={<Myprofile />}/>
        </Routes>
    )
}