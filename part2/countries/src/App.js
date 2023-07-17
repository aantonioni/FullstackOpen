import { useState, useEffect } from 'react';
import countryService from './services/countries';
import Results from './Components/Results';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryResults, setCountryResults] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries=> {
        setCountries(allCountries);
      });
  }, []);

  const countryFilter = (event) => {
    setShowResult(null);
    setWeather(null);
    const val = event.target.value.toLowerCase();
    if (val === '') {
      setCountryResults([]);
      return;
    }
    const results = countries.filter(country => country.name.common.toLowerCase().includes(val));
    if (results.length === 1) {
      countryReadyToShow(results[0]);
    }
    setCountryResults(results);
  }

  const showButtonHandler = (result) => {
    countryReadyToShow(result);
  }

  const countryReadyToShow = (country) => {
    if (country.capitalInfo.latlng) {
      countryService
        .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
        .then(weatherReport => {
          setWeather(weatherReport);
        });
    }
    setShowResult(country);
  }

  return (
    <div>
      find countries <input onChange={countryFilter}></input>
      <Results results={countryResults} show={showResult} weather={weather} showHandler={showButtonHandler}/>
    </div>
  );
}

export default App;
