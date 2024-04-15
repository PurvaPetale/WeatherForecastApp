import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import styled from "styled-components";

const Title = styled.label`
  font-size: 23px;
  font-weight: 700;
  margin-left: 35px;
`;

const DailyItem = styled.div`
  background-color: #e1e5fc;
  border-radius: 15px;
  height: 40px;
  margin: 5px 30px 5px 30px;
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  padding: 5px 20px;
`;

const Icon = styled.img`
  width: 40px;
`;

const Day = styled.label`
  cursor: inherit;
  color: #212121;
  flex: 1 1;
  font-weight: 600;
  margin-left: 15px;
`;

const Description = styled.label`
  cursor: inherit;
  flex: 1 1;
  margin-right: 15px;
  text-align: right;
  /* padding-right: 2px; */
`;

const DailyDetail = styled.div`
  grid-row-gap: 0;
  grid-column-gap: 15px;
  -webkit-column-gap: 15px;
  column-gap: 60px;
  display: grid;
  flex: 1 1;
  grid-template-columns: repeat(2, auto);
  padding: 5px 15px;
  row-gap: 0;
  margin: 0 20px 0 20px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: space-between;

  label {
    &:first-child {
      color: #757575;
    }
    &:last-child {
      color: #212121;
    }
  }
`;

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function ForcastWeather({ forecastData }) {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  );

  return (
    <>
      <Title>Daily Forecast</Title>
      <Accordion>
        {forecastData.list.splice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <DailyItem>
                  <Icon
                    alt="weather"
                    src={`${process.env.PUBLIC_URL}/icons/${item.weather[0].icon}.png`}
                  />
                  <Day>{forecastDays[index]}</Day>
                  <Description>{item.weather[0].description}</Description>
                  <label style={{ color: "#757575" }}>
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </DailyItem>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <DailyDetail>
                <DetailItem>
                  <label>Pressure:</label>
                  <label>{item.main.pressure} hPa</label>
                </DetailItem>
                <DetailItem>
                  <label>Humidity:</label>
                  <label>{item.main.humidity} %</label>
                </DetailItem>
                <DetailItem>
                  <label>Clouds:</label>
                  <label>{item.clouds.all} %</label>
                </DetailItem>
                <DetailItem>
                  <label>Wind Speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </DetailItem>
                <DetailItem>
                  <label>Sea level:</label>
                  <label>{item.main.sea_level} m</label>
                </DetailItem>
                <DetailItem>
                  <label>Feels like:</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </DetailItem>
              </DailyDetail>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default ForcastWeather;
