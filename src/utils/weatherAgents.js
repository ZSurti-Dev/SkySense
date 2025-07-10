export function processWeatherData(weatherData) {
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

  const { temperature, weathercode, windspeed } = weatherData;
  const description = weatherCodeMap[weathercode] || 'Unknown';
  let insight = '';
  if (temperature < 0) {
    insight = 'Brr! Wear a heavy coat!';
  } else if (temperature < 15) {
    insight = 'Cool day, bring a jacket.';
  } else if (temperature < 25) {
    insight = 'Pleasant weather, enjoy!';
  } else {
    insight = 'Hot day, stay hydrated!';
  }

  return {
    temperature: `${temperature}°C`,
    description,
    windspeed: `${windspeed} km/h`,
    insight,
  };
}