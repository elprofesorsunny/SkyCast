import axios from 'axios';
import ErrorHandler from './ErrorHandler';

const apiKey = 'ef827831237dbae7257b7b7499242373';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

const WeatherAPI = {
  searchCity: async (query: string): Promise<any[]> => {
    try {

      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      );

      const weatherPromises = geoResponse.data.map(async (city: any) => {
        const weatherResponse = await axios.get(
          `${baseUrl}/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`
        );
        return {
          ...weatherResponse.data,
          sys: { country: city.country },
        };
      });

      return await Promise.all(weatherPromises);
    } catch (error) {
      const errorMessage = ErrorHandler.handle(error);
      ErrorHandler.log(error);
      throw new Error(errorMessage);
    }
  },
};

export default WeatherAPI;