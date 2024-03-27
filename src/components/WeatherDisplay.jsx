import React from "react";
import clouds from "../images/fewclouds.webp";
import clearsky from "../images/clearsky.webp";
import thunderstorm from "../images/thunderstorm.webp";
import snow from "../images/snow.jpeg";
import showerrain from "../images/showerrain.jpeg";
import mist from "../images/mist.webp";
import "../styles.css";

const WeatherInfo = ({ weatherData }) => {
  // Destructure weatherData object
  console.log(weatherData);
  var temp = weatherData.main.temp;

  const minTemp = weatherData.main.temp_min;

  const maxTemp = weatherData.main.temp_max;

  const weatherDescription = weatherData.weather[0].description;

  const humidity = weatherData.main.humidity;

  const pressure = weatherData.main.pressure;

  const windSpeed = weatherData.wind.speed;

  const imgUrl =
    "http://openweathermap.org/img/wn/" +
    weatherData.weather[0].icon +
    "@2x.png";
  const cityName = weatherData.name;
  const country = weatherData.sys.country;
  const condition = weatherData.weather[0].main;

  // Function to set background image dynamically based on condition
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
    <>
      <div
        id="top"
        className="w-full flex flex-row justify-around items-center"
        style={{
          backgroundImage: `url(${setBackgroundImage()})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          minHeight: "15vw",
        }}
      >
        <div className="first">
          <h1 className="text-4xl text-white md:text-5xl lg:text-6xl">
            {temp}
            <sup className="text-lg md:text-xl lg:text-2xl">°C</sup>
          </h1>
        </div>
        <div className="flex flex-col  second">
          <h1 className="text-2xl m-2 text-white md:text-3lg lg:text-4xl">
            {cityName}
          </h1>
          <h1 className="text-2xl m-2 text-white md:text-3lg lg:text-4xl">
            {country}
          </h1>
          <h1 className="text-2xl m-2 text-white md:text-3lg lg:text-4xl">
            {condition}
          </h1>
        </div>
      </div>
      <div
        className="w-full mt-10 p-10 flex flex-wrap gap-16 justify-around items-center text-center"
        style={{
          backgroundColor: "#DAEAF1",
        }}
      >
        <div className="one">
          <img src={imgUrl} width="100%" alt="" />
          <b className="text-lg">{weatherDescription}</b>
        </div>
        <div className="one">
          <i className="material-icons text-4xl">opacity</i>
          <h3 className="text-lg">Humidity</h3>
          <h2 className="text-lg">{humidity}</h2>
        </div>
        <div className="one">
          <i className="material-icons text-4xl">insights</i>
          <h3 className="text-lg">Pressure</h3>
          <h2 className="text-lg">{pressure}</h2>
        </div>
        <div className="one">
          <i className="material-icons text-4xl">air</i>
          <h3 className="text-lg">Wind Speed</h3>
          <h2 className="text-lg">{windSpeed}</h2>
        </div>
      </div>
    </>
  );
};

export default WeatherInfo;