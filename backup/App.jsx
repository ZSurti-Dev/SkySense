import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import { processWeatherData } from './utils/weatherAgents'; // Fixed typo: weatherAgents -> weatherAgent

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('New York');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      );
      if (!geoResponse.ok) {
        throw new Error(`Geocoding error! status: ${geoResponse.status}`);
      }
      const geoData = await geoResponse.json();
      const location = geoData.results?.[0];
      if (!location) {
        throw new Error('City not found');
      }

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
      );
      if (!weatherResponse.ok) {
        throw new Error(`Weather API error! status: ${weatherResponse.status}`);
      }
      const weatherData = await weatherResponse.json();
      const processedData = processWeatherData(weatherData.current_weather);
      setWeather(processedData);
      setCity(`${location.name}, ${location.country}`);
      setError(null);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message || 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    const interval = setInterval(() => fetchWeather(city), 600000); // Poll every 10 minutes
    return () => clearInterval(interval); // Cleanup on unmount
  }, [city]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      <div className="mt-6 w-full max-w-md">
        {loading && (
          <div className="flex justify-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
              />
            </svg>
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {weather && <WeatherCard weather={weather} city={city} />}
      </div>
    </div>
  );
}

export default App;