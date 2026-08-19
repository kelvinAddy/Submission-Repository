import { useEffect, useState } from "react";
import { getWeather, getWeatherIcon } from "../weather";

const CountryDetails = (props) => {
  return (
    <div>
      <h1>{props.targetCountry.name.common}</h1>
      <li>Capital {props.targetCountry.capital}</li>
      <li>Area {props.targetCountry.area}</li>
      <h2>Languages</h2>
      <ul>
        {Object.values(props.targetCountry.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={props.targetCountry.flags.png} alt={props.targetCountry.flags.alt} />
      <Weather targetCountry={props.targetCountry} />
    </div>
  );
};

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getWeather(...props.targetCountry.capital).then((data) => {
      setWeatherData(data);
    });
  }, []);

  if (!weatherData) return;
  return (
    <div>
      <h2>Weather in {props.targetCountry.capital} </h2>
      <p>Temperature {weatherData.main.temp} Celsius</p>
      <img src={getWeatherIcon(weatherData.weather[0].icon)} alt={weatherData.weather[0].description} />
      <p>Wind {weatherData.wind.speed} m/s</p>
    </div>
  );
};

const Country = (props) => {
  const [showCountry, setShowCountry] = useState(false);

  const handleClick = () => {
    setShowCountry(!showCountry);
  };
  return (
    <>
      <li>
        {props.item.name.common}
        <button onClick={handleClick}>{showCountry ? "Hide" : "Show"}</button>{" "}
      </li>
      {showCountry && <CountryDetails targetCountry={props.item} />}
    </>
  );
};

const CountriesFound = ({ country }) => {
  if (country.length > 10) return <p>Too many matches, specify another filter</p>;
  if (country.length > 1) {
    return (
      <div>
        {country.map((item) => (
          <Country key={item.name.common} item={item} />
        ))}
      </div>
    );
  }

  if (country.length === 1) {
    const [targetCountry] = country;
    return <CountryDetails targetCountry={targetCountry} />;
  }
};

export default CountriesFound;
