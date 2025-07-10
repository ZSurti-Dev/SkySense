function WeatherCard({ weather, city }) {
  // Dynamic background based on weather condition
  const getBackgroundClass = (description) => {
    switch (description.toLowerCase()) {
      case 'clear sky':
      case 'mostly clear':
        return 'bg-yellow-100';
      case 'partly cloudy':
      case 'overcast':
        return 'bg-gray-200';
      case 'light drizzle':
      case 'light rain':
      case 'moderate rain':
      case 'rain showers':
        return 'bg-blue-100';
      case 'light snow':
        return 'bg-blue-50';
      case 'thunderstorm':
        return 'bg-purple-100';
      case 'fog':
        return 'bg-gray-300';
      default:
        return 'bg-white';
    }
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-lg w-full max-w-md ${getBackgroundClass(
        weather.description
      )}`}
    >
      <h2 className="text-xl font-semibold text-gray-800">{city}</h2>
      <div className="mt-4 space-y-2">
        <p className="text-lg">Temperature: {weather.temperature} </p>
        <p className="text-lg">Condition: {weather.description}</p>
        <p className="text-lg">Wind Speed: {weather.windspeed}</p>
        <p className="mt-2 italic text-gray-600">{weather.insight}</p>
      </div>
    </div>
  );
}

export default WeatherCard;