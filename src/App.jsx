import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Zap, Eye, Wind, Thermometer, Droplets, Search, MapPin, RefreshCw } from 'lucide-react';

// Weather data processing function
function processWeatherData(weatherData) {
  const weatherCodeMap = {
    0: 'Clear Sky',
    1: 'Mostly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Dense Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Light Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Light Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Light Showers',
    81: 'Moderate Showers',
    82: 'Heavy Showers',
    85: 'Light Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Heavy Thunderstorm with Hail',
  };

  const { temperature, weathercode, windspeed, humidity } = weatherData;
  const description = weatherCodeMap[weathercode] || 'Unknown';
  let insight = '';
  if (temperature < 0) {
    insight = 'Brr! Bundle up in layers!';
  } else if (temperature < 15) {
    insight = 'Cool and crisp - perfect for a walk!';
  } else if (temperature < 25) {
    insight = 'Pleasant weather ahead!';
  } else {
    insight = 'Stay cool and hydrated!';
  }

  return {
    temperature: Math.round(temperature),
    description,
    windspeed: Math.round(windspeed),
    humidity: humidity || 0,
    insight,
    code: weathercode,
  };
}

// Weather icon component
function WeatherIcon({ code, className = "w-12 h-12" }) {
  const iconProps = { className: `${className} text-white drop-shadow-lg` };
  
  switch(code) {
    case 0:
    case 1:
      return <Sun {...iconProps} className={`${className} text-yellow-300`} />;
    case 2:
    case 3:
      return <Cloud {...iconProps} className={`${className} text-gray-200`} />;
    case 45:
    case 48:
      return <Eye {...iconProps} className={`${className} text-gray-300`} />;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return <CloudRain {...iconProps} className={`${className} text-blue-300`} />;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return <CloudSnow {...iconProps} className={`${className} text-blue-100`} />;
    case 95:
    case 96:
    case 99:
      return <Zap {...iconProps} className={`${className} text-purple-300`} />;
    default:
      return <Sun {...iconProps} className={`${className} text-yellow-300`} />;
  }
}

// Modern search bar component
function SearchBar({ onSearch, loading }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    const city = inputValue.trim();
    if (city) {
      onSearch(city);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a city..."
          className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:bg-white/10 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            <RefreshCw className="w-5 h-5 text-white animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

// Modern weather card component
function WeatherCard({ weather, city, onRefresh, loading }) {
  const getGradientClass = (code) => {
    switch(code) {
      case 0:
      case 1:
        return 'from-yellow-400 via-orange-500 to-red-500';
      case 2:
      case 3:
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 45:
      case 48:
        return 'from-gray-300 via-gray-400 to-gray-500';
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
        return 'from-blue-400 via-blue-500 to-blue-600';
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return 'from-blue-100 via-blue-200 to-blue-300';
      case 95:
      case 96:
      case 99:
        return 'from-purple-400 via-purple-500 to-purple-600';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className={`relative bg-gradient-to-br ${getGradientClass(weather.code)} rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-white/80" />
              <h2 className="text-lg font-semibold text-white/90">{city}</h2>
            </div>
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 text-white ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Main weather display */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <WeatherIcon code={weather.code} className="w-20 h-20" />
            </div>
            <div className="text-6xl font-bold text-white mb-2">
              {weather.temperature}°
            </div>
            <div className="text-xl text-white/90 mb-2">
              {weather.description}
            </div>
            <div className="text-white/80 italic">
              {weather.insight}
            </div>
          </div>

          {/* Weather details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Wind className="w-6 h-6 text-white/80 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{weather.windspeed}</div>
              <div className="text-white/80 text-sm">km/h</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Droplets className="w-6 h-6 text-white/80 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{weather.humidity}%</div>
              <div className="text-white/80 text-sm">Humidity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-white/60 rounded-full animate-spin animate-reverse"></div>
      </div>
      <div className="text-white/80 text-lg">Loading weather data...</div>
    </div>
  );
}

// Error component
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="w-full max-w-md bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 text-center">
      <div className="text-red-200 mb-4">
        <Cloud className="w-12 h-12 mx-auto mb-2" />
        <div className="text-lg font-semibold">Oops! Something went wrong</div>
      </div>
      <div className="text-red-100 mb-4">{message}</div>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-red-500/30 hover:bg-red-500/40 rounded-xl text-red-100 transition-all duration-300"
      >
        Try Again
      </button>
    </div>
  );
}

// Main App component
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('New York');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      );
      
      if (!geoResponse.ok) {
        throw new Error('Unable to find location');
      }
      
      const geoData = await geoResponse.json();
      const location = geoData.results?.[0];
      
      if (!location) {
        throw new Error('City not found. Please try a different name.');
      }

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Weather data unavailable');
      }
      
      const weatherData = await weatherResponse.json();
      const processedData = processWeatherData({
        ...weatherData.current_weather,
        humidity: weatherData.hourly?.relative_humidity_2m?.[0] || 0
      });
      
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

  const handleRefresh = () => {
    const currentCity = city.split(',')[0]; // Get city name without country
    fetchWeather(currentCity);
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Weather
          </h1>
          <p className="text-white/80">Beautiful weather, beautifully displayed</p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={fetchWeather} loading={loading} />

        {/* Content */}
        <div className="flex justify-center">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRefresh} />
          ) : weather ? (
            <WeatherCard 
              weather={weather} 
              city={city} 
              onRefresh={handleRefresh}
              loading={loading}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;