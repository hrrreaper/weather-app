import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import GlobalStyles from "./components/GlobalStyles";
import cloudy from './assets/cloudy.jpg';
import rain from './assets/rain.jpg';
import sunny from './assets/sunny.jpg';
import styled from "styled-components";
import Loading from './components/Loading';
const { REACT_APP_API_KEY } = process.env;

// TODO add search function, add hourly, add 7 day forecast

const App = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [sun, setSun] = useState(false);
  const [cloud, setCloud] = useState(false);
  const [rain, setRain] = useState(false);

  // get lat & long from user if they allow and then fetch the current weather for their location
  useEffect(() => {
    const getData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result);
        })
        .catch((err) => {
          console.log('error', err.message)
        }) 
      await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setForecast(result);
          console.log("5 day forecast",result);
        })
        .catch((err) => {
          console.log('error', err.message)
        }) 
    }
    getData();
  }, [lat, long])

  useEffect(() => {
    if (data.main && data.weather[0].description.includes('cloud')) {
      setCloud(true);
    }
    if (data.main && data.weather[0].description.includes('clear' || 'sun')) {
      setSun(true);
    }
    if (data.main && data.weather[0].description.includes('rain' || 'drizzle')) {
      setRain(true);
    }
}, [data])

  // wait until data is received before trying to display it
  //if the weather is sunny/clear show sunny pic else show cloudy pic
  return (
    <>
      <GlobalStyles />
      {sun && (
        <Sun sunImage={sunny}>
          {data.main ? (
            <Weather data={data} />
          ) : (
            <Loading />
          )}
        </Sun>
      )}
      {cloud && (
          <Cloud cloudImage={cloudy}>
          {data.main ? (
      <Weather data={data}/>
      ) : (
          <Loading />
      )}
        </Cloud>
      )}
      {rain && (
          <Rain rainImage={rain}>
          {data.main ? (
      <Weather data={data}/>
      ) : (
          <Loading />
      )}
        </Rain>
      )}
      
    </>
  );
}

const Sun = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${props => props.sunImage});
  background-position: center;
  background-size: cover;
  
`;
const Cloud = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${props => props.cloudImage});
  background-position: center;
  background-size: cover;
`;

const Rain = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${props => props.rainImage});
  background-position: center;
  background-size: cover;
`;

export default App;
