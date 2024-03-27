import React, { useState } from "react";
import axios from "axios";
import WeatherDisplay from "./components/WeatherDisplay";
import "./styles.css";
const WeatherApp = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("cityName");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleTabClick = (option) => {
    setSelectedOption(option);
  };

  const appId = "0f871056c1dab081a447965f8702e88a"; // Your OpenWeatherMap API Key

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

  const handleCityNameSubmit = (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appId}&units=metric`;
    fetchWeatherData(url);
  };

  const handleCoordinatesSubmit = (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}&units=metric`;
    fetchWeatherData(url);
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    try {
       // Request permission to access location
       const position = await new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(resolve, reject);
       });
       console.log(position)
       const { latitude, longitude } = position.coords;
   
       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}&units=metric`;

       fetchWeatherData(url);
    } catch (error) {
       // Handle errors, such as when the user denies location access
       setError("Error accessing location. Please allow location access.");
    }
   };

  return (
  <div className="h-screen bg-cover bg-fixed bg-center">
      <nav className="flex items-center justify-between p-4 bg-black bg-opacity-75">
        <a className="text-3xl font-bold text-green-400" href="/">Weather</a>
      </nav>
    <div className="lg:px-20 px-5">
      <div className="tab-container lg:w-8/12 mx-auto grid grid-cols-3 my-3">
        <button
          style={
            selectedOption === "cityName"
              ? { fontWeight: "bold", borderBottom: "2px solid black" }
              : { borderBottom: "2px solid #F5F7F8" }
          }
          className="w-full"
          onClick={() => handleTabClick("cityName")}
        >
          City Name
        </button>

        <button
          style={
            selectedOption === "coordinates"
              ? { fontWeight: "bold", borderBottom: "2px solid black" }
              : { borderBottom: "2px solid #F5F7F8" }
          }
          className="w-full"
          onClick={() => handleTabClick("coordinates")}
        >
          Co-Ordinates
        </button>

        <button
          style={
            selectedOption === "location"
              ? { fontWeight: "bold", borderBottom: "2px solid black" }
              : { borderBottom: "2px solid #F5F7F8" }
          }
          className="w-full"
          onClick={() => handleTabClick("location")}
        >
          Location
        </button>
      </div>
      <div className="container mx-auto flex justify-center items-center h-full">
     <div className="bg-white bg-opacity-75 p-8 rounded-lg text-center">
        {selectedOption === "cityName" && (
          <>
          <h1 className="text-green-500 text-4xl font-bold mb-8">Check Weather</h1>
          <form onSubmit={handleCityNameSubmit}>
            <input
              type="text"
              value={cityName}
              className="w-full border-2 px-1 py-0.5 my-2 rounded"
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter city name"
            />
            <button
              className="w-full bg-black text-white py-0.5 rounded"
              type="submit"
            >
              Get Weather
            </button>
          </form>
          </>
        )}

        {selectedOption === "coordinates" && (
          <>
          <h1 className="text-green-500 text-4xl font-bold mb-8">Check Weather</h1>
          <form onSubmit={handleCoordinatesSubmit}>
            <input
              type="text"
              value={latitude}
              className="w-full border-2 px-1 py-0.5 my-2 rounded"
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Enter latitude"
            />
            <input
              type="text"
              value={longitude}
              className="w-full border-2 px-1 py-0.5 my-2 rounded"
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Enter longitude"
            />
            <button
              className="w-full py-0.5 rounded bg-black text-white"
              type="submit"
            >
              Get Weather
            </button>
          </form>
          </>
        )}

        {selectedOption === "location" && (
          <>
          <h1 className="text-green-500 text-4xl font-bold mb-8">Check Weather</h1>
          <form onSubmit={handleLocationSubmit}>
          <button
              className="w-full py-0.5 rounded bg-black text-white"
              type="submit"
            >
              Get Weather
            </button>
          </form>
          </>
        )}
        </div>
      </div>
      {error && <p>{error}</p>}
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
    </div>
  );
};

export default WeatherApp;