import React from "react";
import Home from "./components/home";
import Navbar from "./components/navbar";
import About from "./components/about";
import Profile from "./components/profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/not-found";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
