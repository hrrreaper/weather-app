import React from 'react';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';


const Weather = ({data}) => {
  return (
    <Wrapper>
      {data ? (
      <WeatherDiv>
      <h1>
      Weather for {data.name}
        </h1>
        <div>
        Temperature: {data.main.temp}
        </div>
      <div>
        Feels Like: {data.main.feels_like}
      </div>
      <div>
        Description: {data.weather[0].description}
        </div>
      <div>
        Day: {moment().format('dddd')}
        </div>
      <div>
        Date: {moment().format('LL')}
        </div>
          
      </WeatherDiv>
      ) : (
          <div>Loading...</div>
      )}
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
  padding: 50px;
  border-radius: 20px;
  box-shadow: 2px 2px 8px rgba(0,0,0, 0.4);
  line-height: 2;

`;

export default Weather;
