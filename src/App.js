import React, { useState } from "react";
import axios from "axios";
import WeatherDisplay from "./components/WeatherDisplay";
import clouds from "./images/fewclouds.webp";
import clearsky from "./images/clearsky.webp";
import thunderstorm from "./images/thunderstorm.webp";
import snow from "./images/snow.jpeg";
import showerrain from "./images/showerrain.jpeg";
import mist from "./images/mist.webp";
import "./styles.css";
const WeatherApp = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [error, setError] = useState(null);

  const appId = "260eced213cca0265d51fc50e4ab362a";

  const fetchWeatherData = async (url) => {
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching weather data.");
      setWeatherData(null);
    }
  };
  const fetchWeatherForecast = async (url) => {
    try {
      const response = await axios.get(url);
      const multiplesOfEight = response.data.list.filter((item, index) => index % 8 === 0);
      setWeatherForecast(multiplesOfEight);
      setError(null);
    } catch (error) {
      setError("Error fetching weather data.");
      setWeatherForecast(null);
    }
  };
  const handleCityNameSubmit = async (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appId}&units=metric`;
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${appId}&units=metric`
    fetchWeatherData(url);
    fetchWeatherForecast(url2);
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    try {
      // Request permission to access location
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      console.log(position);
      const { latitude, longitude } = position.coords;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}&units=metric`;
      const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${appId}&units=metric`

      fetchWeatherData(url);
      fetchWeatherForecast(url2);
    } catch (error) {
      // Handle errors, such as when the user denies location access
      setError("Error accessing location. Please allow location access.");
    }
  };
  const condition = weatherData?.weather[0].main;
  const setBackgroundImage = () => {
    switch (condition) {
      case "Clouds":
        return clouds;
      case "Clear":
        return clearsky;
      case "Thunderstorm":
        return thunderstorm;
      case "Snow":
        return snow;
      case "Rain":
        return showerrain;
      case "Atmosphere":
        return mist;
      default:
        return mist;
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${setBackgroundImage()})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
      }}
      className=" flex flex-col justify-start items-center"
    >
      <div className="lg:px-20 px-5">
        <div className="container mx-auto flex justify-center items-center">
          <div className="p-8 rounded-lg text-center">
            <form className="flex" onSubmit={(e) => handleCityNameSubmit(e)}>
              <input
                type="text"
                className="w-full px-1 py-0.5 my-2 placeholder-slate-500"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Enter city name"
              />
              <i
                onClick={handleLocationSubmit}
                className="material-icons text-4xl"
              >
                location_on
              </i>
            </form>
          </div>
        </div>
        {error && <p>{error}</p>}
        {weatherData && <WeatherDisplay weatherData={weatherData} weatherForecast={weatherForecast} />}
      </div>
    </div>
  );
};

export default WeatherApp;
