import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Forgetpassword from "./Forgetpassword";
import Dashboard from "./Dashboard";
import Error from "./Error";
import Laptops from "./Laptops";
import Mobiles from "./Mobiles";
import Watches from "./Watches";
import Cart from "./Cart";   // ✅ Correct
import Products from "./Products";
import { CartProvider } from "./CartContext";





const Master = () => {
    return (
        <CartProvider>   
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forget-password" element={<Forgetpassword />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="laptops" element={<Laptops />} />
                    <Route path="mobiles" element={<Mobiles />} />
                    <Route path="watches" element={<Watches />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="products" element={<Products />} />
                    

                    
                </Route>

                <Route path="/error" element={<Error />} />
            </Routes>
        </BrowserRouter>
        </CartProvider>

    );
};

export default Master;
