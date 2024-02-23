import { Routes, Route } from "react-router-dom"
import { Main } from "./pages/main";
import { Myprofile } from "./pages/myprofile";
import { Myadv } from "./pages/myadv";
import { Advpage } from "./pages/advpage";
import { Seller } from "./pages/sellerprofilepage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/product/:id" element={<Advpage />}/>
            <Route path="/product/:id/seller/:sellerId" element={<Seller />}/>
            {/* <Route path="/profile" element={<Myprofile />}/>
            <Route path="/profile/myproduct" element={<Myadv />}/> */}
        </Routes>
    )
}