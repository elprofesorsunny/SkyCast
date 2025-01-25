import React, { useState } from "react";
import { Dispatch } from "redux";
import { setWeatherData } from "../redux/WeatherSlice";
import ErrorDisplay from "./ErrorDisplay";
import { ErrorHandler } from "../services/ErrorHandler";
import { CustomError } from "../services/CustomError";

interface SearchResultsProps {
  searchResults: Array<{
    id: number;
    name: string;
    sys: { country: string };
    main: { temp: number };
    weather: Array<{ icon: string; description: string }>;
  }>;
  dispatch: Dispatch;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, dispatch }) => {
  const [error, setError] = useState<CustomError | null>(null);

  const handleItemClick = async (result: typeof searchResults[number]) => {
    try {
      if (!result || !result.name) {
        throw new Error("Invalid city data");
      }

      if (result.name === "InvalidCity") {
        throw new Error("Invalid city selected");
      }

      dispatch(setWeatherData(result));
      setError(null); // پاک کردن خطا
    } catch (err: unknown) {
      const handledError = ErrorHandler.handle(err);

      // تبدیل خطا به شیء از نوع CustomError
      const customError: CustomError = {
        type: 'unknown', // یا 'network' یا 'server' بسته به نوع خطا
        message: handledError.message || "An unexpected error occurred.",
        details: {
          status: 500, // این مقدار رو می‌تونی به دلخواه تنظیم کنی
          timestamp: new Date().toISOString(),
        }
      };

      setError(customError);
    }
  };

  return (
    <div className="flex flex-col my-2 gap-4">
      {error && (
        <div className="mx-4">
          <ErrorDisplay error={error} /> {/* ارسال خطا به ErrorDisplay */}
        </div>
      )}

      {searchResults.map((result) => (
        <div
          key={result.id}
          className="relative flex rounded-lg shadow-md cursor-pointer items-center"
          onClick={() => handleItemClick(result)}
        >
          <div className="absolute flex flex-row rounded-xl shadow-md bg-[#dee2e6] justify-start items-center gap-2 px-3 py-2 w-[175px] h-[50px] z-30">
            <div className="text-lg font-semibold">{result.name}</div>
            <div className="text-sm font-light">{result.sys.country}</div>
          </div>
          <div className="absolute flex justify-end bg-[#fff] rounded-xl items-center text-base px-3 py-2 w-[250px] h-[50px] z-20">
            {result.main.temp}°C
          </div>
          <div className="flex justify-end bg-[#dee2e6] w-full rounded-xl">
            <img
              src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`}
              alt={result.weather[0].description}
              className="w-[50px] h-[50px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
