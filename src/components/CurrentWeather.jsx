import React from "react";

import styled from "styled-components";

const WeatherContainer = styled.div`
  width: 330px;
  border-radius: 6px;
  box-shadow: 10px -2px 20px 2px rgb(0 0 0 / 30%);
  color: #fff;
  background-color: #6f71fa;
  margin: 20px auto 20px auto;
  padding: 0 20px 20px 20px;
  position: relative;
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
`;
const City = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 1;
  margin: 0;
  letter-spacing: 1px;
`;
const WeatherIcon = styled.img`
  width: 100px;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 2;
  margin: 0;
`;

const Temp = styled.p`
  font-weight: 600;
  font-size: 60px;
  width: auto;
  letter-spacing: -5px;
  margin: 10px 0;
`;

const Details = styled.div`
  width: 100%;
  padding-left: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.span`
  text-align: left;
  font-weight: 400;
  font-size: 12px;
`;
const Value = styled.span`
  text-align: right;
  font-weight: 600;
  font-size: 12px;
`;
function CurrentWeather({ weatherData }) {
  return (
    <>
      <WeatherContainer>
        <Container>
          <div>
            <City>{weatherData.name}</City>
            <Description>{weatherData.weather[0].description}</Description>
          </div>
          <WeatherIcon
            alt="weather"
            src={`${process.env.PUBLIC_URL}/icons/${weatherData.weather[0].icon}.png`}
          />
        </Container>
        <Container>
          <Temp>{Math.round(weatherData.main.temp)}°C</Temp>
          <Details>
            <Row>
              <Label>Details</Label>
            </Row>
            <Row>
              <Label>Feels Like</Label>
              <Value>{Math.round(weatherData.main.feels_like)}°C</Value>
            </Row>
            <Row>
              <Label>Wind</Label>
              <Value>{weatherData.wind.speed} m/s</Value>
            </Row>
            <Row>
              <Label>Humidity</Label>
              <Value>{weatherData.main.humidity}%</Value>
            </Row>
            <Row>
              <Label>Pressure</Label>
              <Value>{weatherData.main.pressure} hPa</Value>
            </Row>
          </Details>
        </Container>
      </WeatherContainer>
    </>
  );
}

export default CurrentWeather;
