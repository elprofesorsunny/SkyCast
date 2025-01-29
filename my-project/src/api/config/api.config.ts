export const API_CONFIG = {
    BASE_URLS: {
      WEATHER: "https://api.openweathermap.org/data/2.5",
      GEO: "https://api.openweathermap.org/geo/1.0",
    },
    API_KEY: "ef827831237dbae7257b7b7499242373",
    DEFAULT_PARAMS: {
      UNITS: "metric",
      LIMIT: 5,
    },
  } as const;