import axios, { AxiosInstance }  from 'axios';
import { WeatherConfig } from './weather.config';

export const weatherAxios = axios.create({
  baseURL: WeatherConfig.baseURL,
});

export const geoAxios = axios.create({
  baseURL: WeatherConfig.geoURL,
});

const applyCommonInterceptors = (instance: AxiosInstance) => {

  instance.interceptors.request.use((config) => {
    config.params = {
      ...config.params,
      appid: WeatherConfig.apiKey,
      ...WeatherConfig.defaultParams,
    };
    console.log(`Request to: ${config.url?.toUpperCase()}`);
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      console.log(`Answer from: ${response.config.url?.toUpperCase()}`);
      return response;
    },
    (error) => {
      console.error(`Error in: ${error.config?.url?.toUpperCase()}`, error.message);
      return Promise.reject(error);
    }
  );
};

applyCommonInterceptors(weatherAxios);
applyCommonInterceptors(geoAxios);

geoAxios.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    limit: WeatherConfig.defaultParams.limit,
  };
  return config;
});
