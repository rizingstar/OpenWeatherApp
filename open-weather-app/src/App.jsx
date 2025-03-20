import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const getWeather = async () => {
        const apiKey = import.meta.env.VITE_API_KEY; // Use import.meta.env for Vite
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}&units=metric`;

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
            <div className="input-group">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <select value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="">Select state</option>
                    <option value="TX">Texas</option>
                    <option value="CA">California</option>
                </select>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                </select>
            </div>
            <button onClick={getWeather}>Get Weather</button>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}

export default App;