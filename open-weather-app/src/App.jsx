import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const getWeather = async () => {
        const apiKey = import.meta.env.VITE_API_KEY; // Use import.meta.env for Vite
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(apiUrl);
            setWeather(response.data);
            setError(''); // Clear any previous errors
        } catch (error) {
            if (error.response) {
                setError(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                setError('Error: No response from the server. Please try again later.');
            } else {
                setError('Error: Unable to fetch weather data.');
            }
            setWeather(null); // Clear any previous weather data
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
            {error && <p className="error">{error}</p>}
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