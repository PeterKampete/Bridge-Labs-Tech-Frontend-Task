import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, Register, Home } from "../../pages";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default Routing;
