import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "../utils/ApiKey";

function CitySearch({ onCitySelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}`
      );
      onCitySelect(response.data.name);
      setSearchError(null);
    } catch (error) {
      console.error("Error fetching city data:", error);
      setSearchError("City not found. Please enter a valid city name.");
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">Search</button>
      {searchError && <div>{searchError}</div>}
    </form>
  );
}

export default CitySearch;
