import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./page/Home";
import Details from "./page/Details";
import CategoryPage from "./page/CategoryPage";
import { UserProvider } from "./context/Context";
import Cart from "./page/Cart";
import CheckoutPage from "./page/Checkout";
import Login from "./page/Login";
import Register from "./page/Register";
import Profile from "./page/Profile";
import Admin from "./page/Admin";
import Token from "./components/Password/Token";
import Reset from "./components/Password/Reset";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/token" element={<Token />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
