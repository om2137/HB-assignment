import './weather.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { RingLoader } from 'react-spinners';
import { FaArrowLeft,FaTemperatureHigh  } from "react-icons/fa";
import { CiTempHigh } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { IoEarthOutline } from "react-icons/io5";
import { MdAir } from "react-icons/md";
import { FaDroplet, FaTemperatureArrowUp, FaTemperatureArrowDown, FaArrowUpFromGroundWater } from "react-icons/fa6";

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [place, setPlace] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayedEntry, setDisplayedEntry] = useState(null);
  const [displayedTemp, setDisplayedTemp] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_KEYG = process.env.REACT_APP_API_KEYG;

  const getWeather = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEYG}`
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setPlace(response.data.results[0].formatted_address);
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
        );
        setLocation('');
        setWeatherData(weatherResponse.data);
        setError('');
      } else {
        setWeatherData(null);
        setLocation('')
        setError('Location not found. Please check your input.');
      }
    } catch (err) {
      setWeatherData(null);
      setError('Unable to fetch weather data. Please check your location.');
    } finally {
      setLoading(false);
    }
  };
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
  };
  
  useEffect(() => {
    if (weatherData) {

      const newWeatherData = [
        { label: 'Ground Level', value: weatherData.main.grnd_level, icon:<IoEarthOutline size='40px' color='#43aefc'/> }, 
        { label: 'Humidity', value: weatherData.main.humidity + '%', icon:<FaDroplet size='40px' color='#43aefc'/> },
        { label: 'Pressure', value: weatherData.main.pressure, icon:<MdAir size='40px' color='#43aefc'/> },
        { label: 'Sea Level', value: weatherData.main.sea_level, icon:<FaArrowUpFromGroundWater size='40px' color='#43aefc'/> },
      ];
      const newTempData = [
        { label: 'Feels Like', value: kelvinToCelsius(weatherData.main.feels_like) + '°C', icon: <CiTempHigh size='40px' color='#43aefc'/> },
        { label: 'Temperature', value: kelvinToCelsius(weatherData.main.temp) + '°C', icon: <FaTemperatureHigh size='40px' color='#43aefc'/> },
        { label: 'Max Temperature', value: kelvinToCelsius(weatherData.main.temp_max) + '°C', icon: <FaTemperatureArrowUp size='40px' color='#43aefc'/> },
        { label: 'Min Temperature', value: kelvinToCelsius(weatherData.main.temp_min) + '°C', icon: <FaTemperatureArrowDown size='40px' color='#43aefc'/> }
      ];
      setDisplayedEntry(newWeatherData[0]);
      setDisplayedTemp(newTempData[0])
      let index = 1;

      const intervalId = setInterval(() => {
        setDisplayedEntry(newWeatherData[index]);
        setDisplayedTemp(newTempData[index]);
        index = (index + 1) % newWeatherData.length; 
      }, 3000); 
    
      return () => {
        clearInterval(intervalId);
      }
    }
  }, [weatherData]);

  // shake animation
  useEffect(() => {
    if (error) {
      const searchBar = document.getElementById('searchBar');
      searchBar.classList.add('shake');

      const onAnimationEnd = () => {
        searchBar.classList.remove('shake');
        searchBar.removeEventListener('animationend', onAnimationEnd);
      };

      searchBar.addEventListener('animationend', onAnimationEnd);
    }

  }, [error]);
  // loading screen
  const LoadingScreen = () => (
    <div className="loading-screen">
      <p><RingLoader color="#43aefc" size={100}/></p>
    </div>
  );
  return (
    <div className='weather'>
        {!weatherData && !loading &&
            <div className='home'>
                <div className='title'>Weather App</div>
                <div className='search-loc'>
                    <input
                        id="searchBar"
                        type="text"
                        value={location}
                        className={`search ${error ? 'error' : ''}`} 
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            getWeather();
                          }
                        }}
                        placeholder="Enter city name"
                    />
                    {error && <div className='err'>{error}</div>}
                  <div className="or"> or </div>
                  <button className='get-button' onClick={getWeather} disabled={loading}>
                      Get Device Location
                  </button>
                </div>
            </div>
        }
      {loading && <LoadingScreen />}
      {weatherData && (
        <div className='data'>
            <button className='back-button' onClick={()=> setWeatherData(null)}> <FaArrowLeft color='#43aefc'/>&nbsp; Weather App</button>
            <div className='main-data'>
                <div>
                    <img className='image' src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt='error'/>
                </div>
                <div className='main-temp'>{kelvinToCelsius(weatherData.main.temp)}°C</div>
                <div>
                  <div className='main-desc'>{weatherData.weather[0].description}</div>
                  <span><GrLocation/> {place}</span> 
                </div>
            </div>
            <div className='more-data'>
                {displayedTemp && (
                  <div className='temp-data'>
                    {displayedTemp.icon}
                    <div className='sub-head'>
                      <span className='head'>{displayedTemp.value}</span>
                      <span className='sub'>{displayedTemp.label}</span>
                    </div>
                  </div>
                )}
                {displayedEntry && (
                  <div className='other-data'>
                    {displayedEntry.icon}
                    <div className='sub-head'>
                      <span className='head'>{displayedEntry.value}</span>
                      <span className='sub'>{displayedEntry.label}</span>
                    </div>
                  </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
