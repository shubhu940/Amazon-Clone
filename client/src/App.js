import React, { useState } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import MyNavbar from "./Components/MyNavbar";
import Fruits from "./Components/Fruits";
import Home from "./Components/Home";
import YoutubeVideo from "./Components/YoutubeVideo";
import Oil from "./Components/Oil";
import CartPage from "./Components/CartPage";
import Register from "./Pages/Register";
import Login from "./Pages/LoginForm";
import Logout from "./Pages/Logout";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutPage from "./Components/CheckoutPage";
import ConfirmOrderPage from "./Components/ConfirmorderPage";
import Footer from "./Components/Footer";
import ForgotResetPassword from "./Components/ForgotPassword";
import Admin from "./Pages/Admin";
import AdminLayout from "./Pages/AdminLayout";
import Admin_Oildata from "./Pages/Admin_Oildata";
import Admin_FruitData from "./Pages/Admin_FruitData";
import Admin_GrainData from "./Pages/Admin_GrainData";
import Admin_Address from "./Pages/Admin_Address";
import Admin_Orders from "./Pages/Admin_Orders";
import AdminUsers from "./Pages/AdminUsers";
import { UseAuth } from './store/auth';


function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoggedIn, user } = UseAuth();

  return (
    <BrowserRouter>
      <MyNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home searchQuery={searchQuery} />} />
        <Route path="/fruits" element={<Fruits searchQuery={searchQuery} />} />
        <Route path="/youtube" element={<YoutubeVideo />} />
        <Route path="/oils" element={<Oil searchQuery={searchQuery} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin_login" element={<Admin />} />
        <Route path="/admin_panel" element={<AdminLayout />} >
            <Route path="users" element={<AdminUsers/>}/>
            <Route path="oildata" element={<Admin_Oildata/>}/>
            <Route path="fruitdata" element={<Admin_FruitData/>}/>
            <Route path='graindata' element={<Admin_GrainData/>}></Route>
            <Route path='address' element={<Admin_Address/>}></Route>
            <Route path='order' element={<Admin_Orders/>}></Route>
          
        </Route>
        <Route
          path="/forgotpassword"
          element={<ForgotResetPassword></ForgotResetPassword>}
        ></Route>
        <Route path="/logout" element={<Logout />} />
        {isLoggedIn ? (
            <Route path="/cart" element={<CartPage />} />
          ) : (
            <Route path="/cart" element={<Navigate to="/login" />} />
          )}
        <Route path="/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
        <Route
          path="/confirm-order"
          element={<ConfirmOrderPage></ConfirmOrderPage>}
        ></Route>
         {/* Add other routes as needed */}
         {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
      <ToastContainer />
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
