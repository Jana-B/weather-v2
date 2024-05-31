// Weather.tsx
import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import snow from "../src/assets/snow.png";
import drizzle from "../src/assets/drizzle.png";
import clear from "../src/assets/clear.png";
import clouds from "../src/assets/clouds.png";
import mist from "../src/assets/fog.png";
import rain from "../src/assets/rain.png";
import storm from "../src/assets/storm.png";
import windspeedIcon from "../src/assets/windspeed.png";
import temperatureIcon from "../src/assets/temperature.png";
import humidityIcon from "../src/assets/humidity.png";

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`${apiUrl}${city}&appid=${apiKey}`);
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
      toast.error("City not found: Please check the spelling!");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  const getWeatherImage = (main: string) => {
    switch (main.toLowerCase()) {
      case "clouds":
        return clouds;
      case "clear":
        return clear;
      case "mist":
        return mist;
      case "rain":
        return rain;
      case "drizzle":
        return drizzle;
      case "snow":
        return snow;
      case "thunderstorm":
        return storm;
      default:
        return clear;
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>
          <FaSearch />
        </button>
      </div>
      {weather && (
        <div className="weather-data-container">
          <div className="weather-info">
            <h2 className="city">{weather.name}</h2>
            {/* <p>{weather.weather[0].description}</p> */}
            <img
              className="weather-icon-main"
              src={getWeatherImage(weather.weather[0].main)}
              alt={weather.weather[0].main}
            />
          </div>
          <div className="weather-data">
            <p>
              <img
                className="weather-icon-extra"
                src={temperatureIcon}
                alt="Temperature"
              />
              {Math.round(weather.main.temp)}°C
            </p>
            <p>
              <img
                className="weather-icon-extra"
                src={humidityIcon}
                alt="Humidity"
              />
              {weather.main.humidity}%
            </p>
            <p>
              <img
                className="weather-icon-extra"
                src={windspeedIcon}
                alt="Wind Speed"
              />
              {(weather.wind.speed * 3.6).toFixed(2)} km/h
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Weather;
