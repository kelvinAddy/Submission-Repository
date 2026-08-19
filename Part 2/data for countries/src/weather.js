import axios from "axios";

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?";
const weatherIconUrl = "https://openweathermap.org/payload/api/media/file/";

const getWeather = (city) => {
  const data = axios
    .get(`${geocodingUrl}q=${city}&limit=1&appid=${import.meta.env.VITE_API_KEY}`)
    .then((res) => res.data)
    .then((data) => {
      const [geoData] = data;
      const { lat, lon } = geoData;
      return axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`).then((res) => res.data);
    });
  return data;
};

const getWeatherIcon = (iconCode) => {
  return `${weatherIconUrl}${iconCode}.png`;
};

export { getWeather, getWeatherIcon };
