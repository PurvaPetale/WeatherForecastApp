import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../ui/LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import SearchBar from "./SearchBar";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  margin: 0 40px;
  z-index: 1;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const SortIcon = styled.span`
  cursor: pointer;
`;

function CityTable() {
  const [searchedCity, setSearchedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    axios
      .get(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=population%20>%201000&offset=10&limit=12&refine=timezone%3A%22Asia%22"
      )
      .then((res) => setCities(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    axios
      .get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=population%20>%201000&offset=${index}0&limit=12&refine=timezone%3A%22Asia%22`
      )
      .then((res) => {
        const uniqueNewData = res.data.results.filter((newCity) => {
          return !cities.some(
            (existingCity) =>
              existingCity.ascii_name === newCity.ascii_name &&
              existingCity.cou_name_en === newCity.cou_name_en
          );
        });
        setCities((prevCities) => [...prevCities, ...uniqueNewData]);

        res.data.results.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      // Toggle sort direction if the same field is clicked again
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // Set new sort field and reset direction to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCities = useMemo(() => {
    if (sortField === null) return cities;

    // Sort cities based on the selected field and direction
    const sorted = [...cities].sort((a, b) => {
      const modifier = sortDirection === "asc" ? 1 : -1;
      const valueA = a[sortField];
      const valueB = b[sortField];
      if (valueA < valueB) return -1 * modifier;
      if (valueA > valueB) return 1 * modifier;
      return 0;
    });
    return sorted;
  }, [cities, sortField, sortDirection]);

  const handleSearch = (city) => {
    setSearchedCity(city);
  };

  const renderSortIcon = (field) => {
    if (field === sortField) {
      return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleCityClick = (event, cityName) => {
    if (event.button === 2) {
      return;
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {searchedCity && (
        <StyledTable>
          <StyledHeader>
            <div>City</div>
            <div>Country</div>
            <div>Timezone</div>
            <div>Population</div>
            <div>Co-ordinates</div>
          </StyledHeader>
          <StyledBody>
            <StyledRow key={uuidv4()}>
              <div>
                <Link
                  to={`/weather/${searchedCity.ascii_name}`}
                  onClick={(e) => handleCityClick(e, searchedCity.ascii_name)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {searchedCity.ascii_name}
                </Link>
              </div>
              <div>{searchedCity.cou_name_en}</div>
              <div>{searchedCity.timezone}</div>
              <div>{searchedCity.population}</div>
              <div>
                {searchedCity.coordinates.lon} / {searchedCity.coordinates.lat}
              </div>
            </StyledRow>
          </StyledBody>
        </StyledTable>
      )}
      {!searchedCity && (
        <StyledTable>
          <StyledHeader>
            <SortIcon onClick={() => handleSort("name")}>
              City {renderSortIcon("name")}
            </SortIcon>
            <SortIcon onClick={() => handleSort("cou_name_en")}>
              Country {renderSortIcon("cou_name_en")}
            </SortIcon>
            <SortIcon onClick={() => handleSort("timezone")}>
              Timezone {renderSortIcon("timezone")}
            </SortIcon>
            <SortIcon onClick={() => handleSort("population")}>
              Population {renderSortIcon("population")}
            </SortIcon>
            <div>Co-ordinates</div>
          </StyledHeader>
          <InfiniteScroll
            dataLength={cities.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<LoadingSpinner />}
          >
            <StyledBody>
              {(sortedCities ? sortedCities : cities).map((city) => (
                <StyledRow key={uuidv4()}>
                  <div>
                    <Link
                      to={`/weather/${city.ascii_name}`}
                      onClick={(e) => handleCityClick(e, city.ascii_name)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {city.ascii_name}
                    </Link>
                  </div>
                  <div>{city.cou_name_en}</div>
                  <div>{city.timezone}</div>
                  <div>{city.population}</div>
                  <div>
                    {city.coordinates.lon} / {city.coordinates.lat}
                  </div>
                </StyledRow>
              ))}
            </StyledBody>
          </InfiniteScroll>
        </StyledTable>
      )}
    </>
  );
}

export default CityTable;
