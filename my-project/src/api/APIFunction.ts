import APIService from "./APIService";
  
export const getWeatherData = async (query: string) => {
  return await APIService.get(`/geo/1.0/direct?q=${query}&limit=5&type=like`);
};

export const getCurrentWeather = async (city: string) => {
  return await APIService.get(`/data/2.5/weather?q=${city}`);
};