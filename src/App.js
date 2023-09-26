import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './App.css'
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import LoginScreen from "./Screens/Login";
import RegisterScreen from "./Screens/RegisterScreen";
import { useState } from "react";
import CartScreen from "./Screens/CartScreen";
import Shipping from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import Checkout from "./Screens/Checkout";
import OrderScreen from "./Screens/Order";



function App() {

  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("cartItems") || "[]"))

  return (

    <BrowserRouter>

      <div className="App">
        <Header cartItems={cartItems} />
        <div className="main pt-2" style={{ minHeight: "90.2vh" }}>

          <Routes>



            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<RegisterScreen />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/paymentMethod" element={<PaymentScreen />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} setcartItems={setcartItems} />} />

            <Route path="/cart" element={<CartScreen cartItems={cartItems} setcartItems={setcartItems} />} />
            <Route path="/order/:orderId" element={<OrderScreen />} />

            <Route path="/product/:id" element={< ProductScreen cartItems={cartItems} setcartItems={setcartItems} />} />

          </Routes>
        </div>

        <Footer />


      </div>
    </BrowserRouter>
  );
}

export default App;
