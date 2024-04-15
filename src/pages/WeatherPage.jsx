import { useEffect, useState } from "react";
import CurrentWeather from "../components/CurrentWeather";
import styled from "styled-components";
import axios from "axios";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useParams } from "react-router-dom";
import { API_KEY } from "../utils/ApiKey";
import { WEATHER_API_URL } from "../utils/api";
import ForcastWeather from "../components/ForcastWeather";

const PageContainer = styled.div`
  padding-top: 60px;
`;

const MessageContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Message = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
`;

function WeatherPage() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { cityName } = useParams();

  // const apiKey = "00e5fd5ad60e4ac1f090e8634610a84b";
  // const city = "London";

  useEffect(() => {
    const fetchCurrentWeatherData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${WEATHER_API_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric
          `
        );
        const res = await axios.get(
          `${WEATHER_API_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric
          `
        );
        setCurrentWeatherData(response.data);
        setForecastData(res.data);
        setIsLoading(false);
        console.log(response.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (cityName) {
      fetchCurrentWeatherData();
    }
  }, [cityName]);

  if (!cityName) {
    return (
      <MessageContainer>
        <Message>Please select a city from the city table.</Message>
      </MessageContainer>
    );
  }

  return (
    <PageContainer>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {currentWeatherData && (
            <CurrentWeather weatherData={currentWeatherData} />
          )}
          {forecastData && <ForcastWeather forecastData={forecastData} />}
        </>
      )}
    </PageContainer>
  );
}

export default WeatherPage;
