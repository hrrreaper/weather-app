import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import GlobalStyles from "./components/GlobalStyles";
import cloudy from './assets/cloudy.jpg';
import sunny from './assets/sunny.jpg';
import styled from "styled-components";
const { REACT_APP_API_KEY } = process.env;



const App = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [sun, setSun] = useState(false);
  const [cloud, setCloud] = useState(false);

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
          console.log(result);
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
}, [data])

  // wait until data is received before trying to display it
  //if the weather is sunny/clear show sunny pic else show cloudy pic
  return (
    <>
      <GlobalStyles />
      {sun ? (
        <Sun sunImage={sunny}>
      {data.main ? (
      <Weather data={data}/>
      ) : (
          <div>Loading...</div>
      )}
        </Sun>
      ) : (
          <Cloud cloudImage={cloudy}>
          {data.main ? (
      <Weather data={data}/>
      ) : (
          <div>Loading...</div>
      )}
        </Cloud>
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

export default App;
