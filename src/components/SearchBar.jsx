import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  position: relative;
  z-index: 0;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1;
`;

const Input = styled.input`
  margin-left: 40px;
  margin-bottom: 10px;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  width: 100%;
  max-width: 500px;
  border: 1px solid "var(--color-grey-100)";
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  margin-bottom: 10px;
  margin-left: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Suggestions = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  width: 100%;
  max-height: 200px;

  overflow-y: auto;
  background-color: #fff;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  padding: 8px 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    axios
      .get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=name%20LIKE%20%27%25${searchTerm}%25%27&limit=1`
      )
      .then((res) => {
        console.log(res.data);
        const city = res.data.results[0];
        onSearch(city);
      })
      .catch((err) => console.log(err));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length >= 2) {
      axios
        .get(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=name%20LIKE%20%27%25${value}%25%27&limit=5`
        )
        .then((res) => {
          const suggestions = res.data.results.map((result) => result.name);
          setSuggestions(suggestions);
        })
        .catch((err) => console.log(err));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <Container>
        <InputContainer>
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleSearch}>Search</Button>
        </InputContainer>

        {suggestions.length > 0 && (
          <Suggestions>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </SuggestionItem>
            ))}
          </Suggestions>
        )}
      </Container>
    </>
  );
};

export default SearchBar;
