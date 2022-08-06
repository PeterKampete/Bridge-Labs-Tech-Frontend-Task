import React from "react";
import { useNavigate } from "react-router-dom";
import { NavContainer, Home } from "./Navbar.styles";

const Navbar = ({ logout }) => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };
  return (
    <NavContainer>
      <Home>Home</Home>
      <button onClick={handleLogout}>Logout</button>
    </NavContainer>
  );
};

export default Navbar;
