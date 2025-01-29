import { geoClient } from '../clients/geo.client';
import { weatherClient } from '../clients/weather.client';
import { ENDPOINTS } from '../config/endpoints';
import { GeoData, WeatherData } from '../types/weather.type';

export const WeatherService = {
  async searchCities(query: string): Promise<WeatherData[]> {
    const { data: geoData } = await geoClient.get<GeoData[]>(
      ENDPOINTS.GEO.DIRECT,
      { params: { q: query } }
    );

    const weatherPromises = geoData.map(async (location) => {
      const { data } = await weatherClient.get<WeatherData>(
        ENDPOINTS.WEATHER.CURRENT,
        { params: { lat: location.lat, lon: location.lon } }
      );
      
      return {
        ...data,
        sys: { country: location.country },
        coord: { lat: location.lat, lon: location.lon },
      };
    });

    return Promise.all(weatherPromises);
  },
};