import { weatherAxios, geoAxios } from './weather.interceptor';
import { ErrorHandler } from '../services/ErrorHandler';

interface GeoResponse {
  lat: number;
  lon: number;
  country: string;
  name: string;
}

interface WeatherResponse {
  id: number;
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

const WeatherAPI = {
  async searchCity(query: string): Promise<WeatherResponse[]> {
    try {
      const { data: geoData } = await geoAxios.get<GeoResponse[]>('/direct', {
        params: { q: query }
      });

      const promises = geoData.map(async (city) => {
        const { data } = await weatherAxios.get<WeatherResponse>('/weather', {
          params: { lat: city.lat, lon: city.lon }
        });
        
        return {
          ...data,
          sys: { country: city.country },
          coord: { lat: city.lat, lon: city.lon },
        };
      });

      return Promise.all(promises);
    } catch (error) {
      const errorMessage = ErrorHandler.handle(error);
      ErrorHandler.log(error);
      throw new Error(errorMessage);
    }
  },
};

export default WeatherAPI;