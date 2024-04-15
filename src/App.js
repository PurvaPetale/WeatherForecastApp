import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CityTablePage from "./pages/CityTablePage";
import WeatherPage from "./pages/WeatherPage";
import Navbar from "./components/Navbar";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city-table" element={<CityTablePage />} />
          <Route path="/weather/:cityName" element={<WeatherPage />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
