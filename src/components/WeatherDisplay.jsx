import React from "react";
import { Progress } from "antd";
import "../styles.css";

const WeatherInfo = ({ weatherData }) => {
  const temp = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const pressure = weatherData.main.pressure;
  const windSpeed = weatherData.wind.speed;

  const imgUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <>
      <div
        className="w-full mt-10 p-10 flex flex-wrap gap-16 justify-around items-center text-center"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <div id="top" className="flex justify-around items-center">
          <div className="one">
          <div className="w-full flex justify-center">
            <img src={imgUrl} className="w-3/6 sm:w-full" alt="" />
            </div>
            <b className="text-sm sm:text-lg">{weatherDescription}</b>
          </div>
          <div className="text-sm sm:text-3xl absolute right-2 top-2" style={{ color: "white" }}>
            {temp}
            <sup>°C</sup>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col gap-10 sm:flex-row justify-around w-full">
          <div className="flex flex-col justify-around">
            <i className="material-icons text-4sm">opacity</i>
            <h3 className="text-sm lg:text-lg">Humidity</h3>
            <Progress strokeColor={"#fff"} type="circle" percent={humidity} size="small" />
          </div>
          <div className="one">
            <i className="material-icons text-4sm">insights</i>
            <h3 className="text-sm lg:text-lg">Pressure</h3>
            <h2 className="text-sm lg:text-lg">{pressure}</h2>
          </div>
          <div className="one">
            <i className="material-icons text-4sm">air</i>
            <h3 className="text-sm lg:text-lg">Wind Speed</h3>
            <h2 className="text-sm lg:text-lg">{windSpeed}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherInfo;
