export const WeatherConfig = {
    baseURL: "https://api.openweathermap.org/data/2.5",
    geoURL: "https://api.openweathermap.org/geo/1.0",
    apiKey: "ef827831237dbae7257b7b7499242373",
    defaultParams: {
      units: "metric",
      limit: 5,
    },
  } as const;