
import axios from 'axios'

const apiKey = "xz"; //replace with your own key
const baseUrl = "http://api.weatherstack.com";
const makeCityRequestUrl = city =>
  `${baseUrl}/current?access_key=${apiKey}&query=${city}`;

const getCityWeather = async city => {
    const req = axios.get(makeCityRequestUrl(city));
    const res = await req;
    return res.data;
  };
  
  export default { getCityWeather }