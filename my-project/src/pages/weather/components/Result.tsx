import { GeoData, WeatherData } from "../../../api/types/weather.type.ts";
import React, { useEffect, useState } from "react";
import { getCurrentWeather } from "../../../api/APIFunction.ts";
import { handleError } from "../../../utils/errorHandler.ts";
import { setWeatherData } from "../../../redux/WeatherSlice.ts";

interface SearchResultsProps {
  searchResults: GeoData[];
  dispatch: any;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  dispatch,
}) => {
  const [weatherDataList, setWeatherDataList] = useState<WeatherData[]>([]);
  const [, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);

      try {
        searchResults.map(async (result) => {
          try {
            const weatherResponse = await getCurrentWeather(result.name);
            const weatherData = weatherResponse.data as WeatherData;
            const resultObj = {
              id: weatherData.id,
              name: result.name,
              sys: { country: result.country },
              main: weatherData.main || {
                temp: undefined,
                temp_min: undefined,
                temp_max: undefined,
              },
              weather: weatherData.weather ? [weatherData.weather[0]] : [],
            };
            setWeatherDataList(resultObj.filter((data) => data !== undefined));
          } catch (err) {
            handleError(err); // Use error handler
          }
        });
      } catch (error) {
        handleError(error); // Use error handler
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [searchResults]);

  const handleItemClick = async (city: string) => {
    try {
      const response = await getCurrentWeather(city);
      const weatherData = response.data as WeatherData;
      dispatch(setWeatherData(weatherData));
    } catch (err) {
      handleError(err); // Use error handler
    }
  };

  return (
    <div className="flex flex-col my-2 gap-4">
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
            {result.main?.temp !== undefined
              ? `${Math.round(result.main.temp - 273.15)}°C`
              : "N/A"}
          </div>
          <div className="flex justify-end bg-[#dee2e6] w-full rounded-xl">
            <img
              src={`https://openweathermap.org/img/wn/${result.weather?.[0]?.icon}@4x.png`}
              alt={result.weather?.[0]?.description || "Weather icon"}
              className="w-[50px] h-[50px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
