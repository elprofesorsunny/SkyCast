export interface GeoData {
  lat: number;
  lon: number;
  country: string;
  name: string;
}

export interface WeatherData {
  id: number;
  name: string;
  sys: {
    country: string;
  };
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
  coord?: {
    lat: number;
    lon: number;
  };
}