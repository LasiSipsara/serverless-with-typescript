import {
  ClientErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "@libs/api-gateway";
import axios from "axios";

const getWeather = async (event) => {
  const WEATHER_API_KEY = "4a0d716697311de4ada9a7f39829810c";

  try {
    const city = event.queryStringParameters?.city;

    if (!city) {
      return ClientErrorResponse({
        messsage: "City is required",
      });
    }
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

    const response = await axios.get(API_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: "metric",
      },
    });

    const weatherData = response.data;

    return SuccessResponse({
      message: JSON.stringify(weatherData),
    });
  } catch (error) {
    console.error(error);

    return ServerErrorResponse({
      message: "Internal server error",
    });
  }
};
export const main = getWeather;
