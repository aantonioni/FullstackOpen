import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = process.env.REACT_APP_API_KEY;

const getAll = () => {
	const request = axios.get(`${baseUrl}/api/all`);
	return request.then(response => response.data);
}

const getWeather = (lat, lon) => {
	const request = axios.get(`${weatherUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
	return request.then(response => response.data);
}

export default { getAll, getWeather };