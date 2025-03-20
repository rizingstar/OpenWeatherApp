import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
        const apiKey = process.env.REACT_APP_API_KEY; // Use environment variable 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(apiUrl);
            setWeather(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="App">
            <h1>Open Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={getWeather}>Get Weather</button>
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default App;