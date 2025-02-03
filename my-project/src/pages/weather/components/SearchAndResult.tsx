import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ErrorHandler } from "../../../utils/errorHandler";
import { HandledError } from "../../../api/types/error.type";
import { getWeatherData, getCurrentWeather } from "../../../api/APIFunction";
import { setWeatherData } from "../../../redux/WeatherSlice";
import { Dispatch } from "redux";
import { GeoData, WeatherData } from "../../../api/types/weather.type";
import { toast } from 'react-toastify';

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
      <input
        placeholder="Search city..."
        className="bg-[#f8f9fa] rounded-2xl w-[300px] h-[35px] p-6 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.2)]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

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
        const errorMessage = "Failed to fetch weather data";
        setError(errorMessage);
        toast.error(errorMessage);
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
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col my-2 gap-4">
      {error && weatherDataList.length === 0 && (
        <div className="mx-4">
          <p className="text-red-500">{error}</p>
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

const SearchAndResult: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const prevSearchTerm = useRef<string>("");

  const fetchSearchResults = useCallback(async (query: string) => {
    if (query.length < 3) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getWeatherData(query);
      const results: any = response.data;
      setSearchResults(results);
    } catch (err: unknown) {
      const handledError = ErrorHandler(err);
      const errorMessage = (handledError as HandledError).message || "An error occurred while fetching data.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 500), [fetchSearchResults]);

  useEffect(() => {
    const initialSearchTerm = searchParams.get("query");
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
      fetchSearchResults(initialSearchTerm);
    }
  }, [searchParams, fetchSearchResults]);

  useEffect(() => {
    if (searchTerm.trim() && searchTerm !== prevSearchTerm.current) {
      setError(null);
      debouncedFetchSearchResults(searchTerm);
      setSearchParams({ query: searchTerm });
      prevSearchTerm.current = searchTerm;
    } else if (!searchTerm.trim()) {
      setSearchResults([]);
      setSearchParams({});
    }
  }, [searchTerm, debouncedFetchSearchResults, setSearchParams]);

  return (
    <main className="flex flex-col bg-[#e9ecef] shadow-lg absolute right-0 bottom-10 top-28 p-5 text-black rounded-tl-2xl rounded-bl-2xl gap-6">
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading && <div>Loading...</div>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && searchResults.length === 0 && searchTerm.trim() && (
        <div className="text-gray-500">No data found for your search.</div>
      )}
      <SearchResults searchResults={searchResults} dispatch={dispatch} />
    </main>
  );
};

export default SearchAndResult;