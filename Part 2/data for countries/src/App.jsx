import { useState, useEffect } from "react";
import { data } from "./countries";
import CountriesFound from "./Components/CountriesFound";

const App = () => {
  const [country, setCountry] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    data.then((countries) => {
      setCountry(countries.filter((country) => country.name.common.toLowerCase().includes(value.toLowerCase())));
    });
  }, [value]);

  const handleInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <label>
        Find countries <input value={value} onChange={handleInput} />
      </label>
      <CountriesFound country={country} />
    </>
  );
};

export default App;
