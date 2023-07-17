const Results = ({ results, show, weather, showHandler }) => {
	return (
		<>
			<SearchResults results={results} showHandler={showHandler}/>
			<Result country={show} weather={weather}/>
		</>
	);
};

const SearchResults = ({ results, showHandler }) => {
	if (results.length < 2) {
		return null;
	}

	if (results.length > 10) {
		return <p>Too many matches, specify a different filter</p>;
	} else {
		return (
				<>
						{results.map(res => <SearchResult key={res.name.common} result={res} showHandler={showHandler} />)}
				</>
		);
	}
};

const SearchResult = ({ result, showHandler }) => {
	return (
		<>
			<p>{result.name.common} <button onClick={() => showHandler(result)}>show</button></p>
		</>
	);
};

const Result = ({ country, weather }) => {
	if (country === null) {
		return null;
	}

	const getLanguages = (langObject) => {
		let ret = [];
		for (const key in langObject) {
			ret.push(<li key={key}>{langObject[key]}</li>);
		}

		return ret;
	};

	return (
		<>
			<h1>{country.name.common}</h1>
			{country.capital ? <p>capital {country.capital[0]}</p> : null}
			<p>area {country.area}</p>
			<h2>languages:</h2>
			<ul>
				{getLanguages(country.languages)}
			</ul>
			<img src={country.flags.png} alt={country.flags.alt}/>
			<Weather report={weather} />
		</>
	);
}

const Weather = ({ report }) => {
	if (report === null) {
		return null;
	}

	return (
		<>
			<h2>Weather in {report.name}</h2>
			<p>temperature {report.main.temp - 273.15} Celsius</p>
			<img src={`https://openweathermap.org/img/wn/${report.weather[0].icon}@2x.png`}/>
			<p>wind {report.wind.speed} m/s</p>
		</>
	)
};

export default Results;