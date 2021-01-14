import React,{useEffect,useState} from 'react'

import WeatherApi from '../services/WeatherApi';

const CountriesWeather = (props) => {
    const {value} = props;
    const [weatherData, setWeatherData] = useState({});
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        WeatherApi.getCityWeather(value).then(data => {
            setHasData(true);
            setWeatherData({
                temperature: data.current.temperature,
                icon: data.current.weather_icons[0],
                windSpeed: data.current.wind_speed,
                windDirection: data.current.wind_dir
            })
        })
    },[value])
    return hasData ? (
        <>
          <h3>Weather in {value}</h3>
          <p>
            <strong>temperature:</strong> {weatherData.temperature} celsius
          </p>
          <img src={weatherData.icon} alt="icon" />
          <p>
            <strong>wind:</strong> {weatherData.windSpeed} kph direction{" "}
            {weatherData.windDirection}
          </p>
        </>
      ) : <h1>noo</h1>;
}

export default CountriesWeather
