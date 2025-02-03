import React, { useState, useEffect } from "react";
import { Dispatch } from "redux";
import { setWeatherData } from "../redux/WeatherSlice";
import { ErrorDisplay } from "./ErrorDisplay";
import { getCurrentWeather } from "../api/APIFunction";
import { GeoData, WeatherData } from "../api/types/weather.type";

interface SearchResultsProps {
  searchResults: GeoData[];
  dispatch: Dispatch;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, dispatch }) => {
  const [error, setError] = useState<string | null>(null);
  const [weatherDataList, setWeatherDataList] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!Array.isArray(searchResults) || searchResults.length === 0) {
      setWeatherDataList([]);
      return;
    }

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const weatherDataList = await Promise.all(
          searchResults.map(async (result) => {
            try {
              if (!result.name) {
                throw new Error("City name is missing");
              }

              // getWeatherData
              const weatherResponse = await getCurrentWeather(result.name);
              if (!weatherResponse || !weatherResponse.data) {
                throw new Error("Failed to fetch weather data");
              }
              const weatherData = weatherResponse.data;

              return {
                id: weatherData.id,
                name: result.name,
                sys: { country: result.country },
                main: weatherData.main || { temp: undefined, temp_min: undefined, temp_max: undefined },
                weather: weatherData.weather?.[0] || null,
              };
            } catch (err) {
              console.error(`Error fetching weather for ${result.name}:`, err);
              return null;
            }
          })
        );

        setWeatherDataList(weatherDataList.filter((data) => data !== null));
      } catch (error) {
        setError("Failed to fetch weather data");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [searchResults]);

  const handleItemClick = async (city: string) => {
    try {
      const response = await getCurrentWeather(city);
      if (!response || !response.data) {
        throw new Error("Failed to fetch weather data");
      }
      const weatherData = response.data as WeatherData;
      dispatch(setWeatherData(weatherData));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  return (
    <div className="flex flex-col my-2 gap-4">
      {error && weatherDataList.length === 0 && (
        <div className="mx-4">
          <ErrorDisplay errorMessage={error} />
        </div>
      )}

      {loading && !error && (
        <p className="text-center text-gray-600">Loading...</p>
      )}

      {!loading && weatherDataList.length === 0 && !error && (
        <p className="text-center text-gray-600">No data available</p>
      )}

      {weatherDataList.map((result, index) => (
        <div
          key={index}
          className="relative flex rounded-lg shadow-md cursor-pointer items-center"
          onClick={() => handleItemClick(result.name)}
        >
          <div className="absolute flex flex-row rounded-xl shadow-md bg-[#dee2e6] justify-start items-center gap-2 px-3 py-2 w-[195px] h-[50px] z-30">
            <div className="text-lg font-semibold">{result.name}</div>
            <div className="text-sm font-light">{result.sys.country}</div>
          </div>
          <div className="absolute flex justify-end bg-[#fff] rounded-xl items-center text-base px-3 py-2 w-[250px] h-[50px] z-20">
            {result.main?.temp !== undefined ? `${Math.round(result.main.temp - 273.15)}°C` : "N/A"}
          </div>
          <div className="flex justify-end bg-[#dee2e6] w-full rounded-xl">
            <img
              src={`https://openweathermap.org/img/wn/${result.weather?.icon}@4x.png`}
              alt={result.weather?.description || "Weather icon"}
              className="w-[50px] h-[50px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
