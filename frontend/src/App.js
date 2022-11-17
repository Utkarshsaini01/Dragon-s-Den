import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Home from "./components/Home";
import Sold from "./components/soldproduct";
import Profile from "./components/Profile";
import Details from "./components/Details";

function Connect(){
  const params = useParams();
  console.log(params);
  return(<div><Details id={params.id} /></div>);
}

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/product" element={<Product />}></Route>
            <Route path="/add" element={<AddProduct />}></Route>
            <Route path="/soldproduct" element={<Sold />}></Route>
            <Route path="/logout" element={<h1>user logged out</h1>}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/details/:id" element={<Connect />}></Route>
          </Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
