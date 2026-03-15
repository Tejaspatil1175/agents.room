const axios = require('axios');
const { callGroq } = require('../groq');

async function runWeatherAgent(config, user) {
  const { city, unit = 'metric' } = config;
  if (!city) throw new Error('Weather agent requires a city in config');

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${unit}`;

  const weatherRes = await axios.get(url);
  const w = weatherRes.data;

  const weatherData = `
City: ${w.name}
Temperature: ${w.main.temp}°${unit === 'metric' ? 'C' : 'F'}
Feels like: ${w.main.feels_like}°
Humidity: ${w.main.humidity}%
Wind speed: ${w.wind.speed} ${unit === 'metric' ? 'km/h' : 'mph'}
Condition: ${w.weather[0].description}
  `.trim();

  const systemPrompt = 'You are a friendly weather reporter. Give a short 4-line weather briefing in a conversational tone.';
  return callGroq(user, systemPrompt, weatherData);
}

module.exports = { runWeatherAgent };
