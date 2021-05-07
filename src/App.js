import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";
const { REACT_APP_API_KEY } = process.env;


const App = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

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

  return (
    <>
      <GlobalStyles />
      {data.main ? (
      <Weather data={data}/>
      ) : (
          <div>Loading...</div>
      )}
    </>
  );
}


export default App;
