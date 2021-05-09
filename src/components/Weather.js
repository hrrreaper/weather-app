import React from 'react';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';
import { FiRefreshCcw } from "react-icons/fi";


const refresh = () => {
  window.location.reload();
}

const Weather = ({data}) => {
  return (
    <Wrapper>
      <WeatherDiv>
        <div>
          <Button onClick={refresh}><FiRefreshCcw size={20}/></Button>
      <H1>
      {data.name}
          </H1>
        </div>
        <div>
        Temperature: {Math.round(data.main.temp)} &deg;C
        </div>
      <div>
        Feels Like: {Math.round(data.main.feels_like)} &deg;C
      </div>
      <div>
        Description: {data.weather[0].description}
        </div>
        <div>
          Humidity: {data.main.humidity}%
        </div>
      <div>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</div>
      <div>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</div>
      <div>
        Date: {moment().format('dddd, LL')}
      </div>
          
      </WeatherDiv>
      </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WeatherDiv = styled.div`
  width: fit-content;
  padding: 20px 50px;
  border-radius: 20px;
  box-shadow: 2px 2px 8px rgba(0,0,0, 0.4);
  line-height: 2;
  font-size: 1.2rem;
  background-color: rgba(255,255,255, 0.7);

`;

const H1 = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0,0,0, 0.4);
  text-align: center;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default Weather;
