import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "../../pages/Home";
import PatternLikes from "../../pages/PatternLikes";
import Profil from "../../pages/Profil";

import Navbar from "../Navbar";

const index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/patternLikes" exact element={<PatternLikes />} />
        <Route path="/profil" exact element={<Profil />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default index;
