
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/common/LandingPage";
import AdminRoutes from "./routes/AdminRoutes";
import TouristRoutes from "./routes/TouristRoutes";
import About from "./pages/common/About";
import Navbar from "./components/UI/Navbar";
import Footer from "./components/UI/Footer";
import LiveLocation from "./components/UI/LiveLocation";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/tourist/*" element={<TouristRoutes />} />
          <Route path="/about" element={<About />} />
          {/* ✅ Add Live Location Page */}
          <Route path="/live-location" element={<LiveLocation />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
