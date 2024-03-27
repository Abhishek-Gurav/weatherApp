import React from "react";
import { Typography, Row, Col, Statistic, Progress } from "antd";
import clouds from "../images/fewclouds.webp";
import clearsky from "../images/clearsky.webp";
import thunderstorm from "../images/thunderstorm.webp";
import snow from "../images/snow.jpeg";
import showerrain from "../images/showerrain.jpeg";
import mist from "../images/mist.webp";
import "../styles.css";

const { Title } = Typography;

const WeatherInfo = ({ weatherData }) => {
  const temp = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const pressure = weatherData.main.pressure;
  const windSpeed = weatherData.wind.speed;
  const cityName = weatherData.name;
  const country = weatherData.sys.country;
  const condition = weatherData.weather[0].main;

  const imgUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  // Function to set icon based on condition
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
        <Row className="w-full flex flex-row justify-around items-center">
          <Col>
            <Title level={1} style={{ color: "white" }}>
              {temp}
              <sup style={{ fontSize: "1.5rem" }}>°C</sup>
            </Title>
          </Col>
          <Col>
            <div>
              <Title level={3} style={{ color: "white" }}>
                {cityName}
              </Title>
              <Title level={3} style={{ color: "white" }}>
                {country}
              </Title>
              <Title level={3} style={{ color: "white" }}>
                {condition}
              </Title>
            </div>
          </Col>
        </Row>
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
          <Progress type="circle"  percent={humidity} size="small" />
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
