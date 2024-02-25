import { Routes, Route, Navigate } from "react-router-dom"
import { Main } from "./pages/main";
import { Myprofile } from "./pages/myprofile";
import { Myadv } from "./pages/myadv";
import { Advpage } from "./pages/advpage";
import { Seller } from "./pages/sellerprofilepage";
import { useSelector } from "react-redux";



export const AppRoutes = () => {
    const isTokenGlobal = useSelector(state => state.product.tokenExists);
    return (
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/product/:id" element={<Advpage />}/>
            <Route path="/product/:id/seller/:sellerId" element={<Seller />}/>
            <Route path="/profile" element={<Myprofile isAuthenticated={isTokenGlobal} />} />
            <Route path="/profile/myproduct" element={<Myadv isAuthenticated={isTokenGlobal} />} />
        </Routes>
    )
}