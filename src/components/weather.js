import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [place, setPlace] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = '92aefadd549ccbcf25253e60db2ea87d';
  const API_KEYG = 'AIzaSyAa6LBB3KrCAv-H35P3_B7L5vBruA8q6Bs';

  const getWeather = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEYG}`
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setPlace(response.data.results[0].formatted_address);
        console.log(response)
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
        );
        console.log(weatherResponse.data);
        setWeatherData(weatherResponse.data);
        setError('');
      } else {
        setWeatherData(null);
        setError('Location not found. Please check your input.');
      }
    } catch (err) {
      setWeatherData(null);
      setError('Unable to fetch weather data. Please check your location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={getWeather} disabled={loading}>
        {loading ? 'Loading...' : 'Get Weather'}
      </button>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.weather[0].description}</h2>
          <h2>{place}</h2>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
