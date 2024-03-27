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
        <Row className="w-full flex flex-row justify-around items-center" >
          <Col>
            <Title level={1} style={{ color: "white" }}>
              {temp}
              <sup style={{ fontSize: "1.5rem" }}>°C</sup>
            </Title>
          </Col>
          <Col>
            <div>
              <Title level={3} style={{ color: "white" }}>{cityName}</Title>
              <Title level={3} style={{ color: "white" }}>{country}</Title>
              <Title level={3} style={{ color: "white" }}>{condition}</Title>
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
        <Row className="w-full flex flex-row justify-around items-center">
          <Col span={6}>
            <img src={imgUrl} alt="" width="100%" />
            <b className="text-lg">{weatherDescription}</b>
          </Col>
          <Col span={6}>
            <p className="mb-2 text-gray-500">Humidity</p>
            <Progress type="circle" percent={humidity} size="small" />
          </Col>
          <Col span={6}>
            <Statistic title="Pressure" value={pressure} suffix="hPa" />
          </Col>
          <Col span={6}>
            <Statistic title="Wind Speed" value={windSpeed} suffix="m/s" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default WeatherInfo;
