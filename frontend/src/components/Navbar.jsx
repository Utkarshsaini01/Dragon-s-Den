import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  function logout() {
    // console.log("Hello");
    localStorage.clear();
    navigate("/");
  }
  return (
    <div className="navbar">
      <img className="logo" alt="logo" src="/logo.png" />
      {auth ? (
        <ul className="links-ul navbar-right">
          <li><Link to="/product">Product</Link></li>
          <li><Link to="/add">Add products</Link></li>
          <li><Link to="/soldproduct">Sold Products</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link onClick={logout} to="/">Logout ({JSON.parse(auth).name})</Link></li>
        </ul>
      ) : (
        <ul className="links-ul navbar-right">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
