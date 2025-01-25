import React from "react";
import { Dispatch } from 'redux';
import { setWeatherData } from '../redux/WeatherSlice';
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

interface SearchResultsProps {
    searchResults: any[];
    dispatch: Dispatch;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, dispatch }) => {
    const weatherData = useSelector((state: RootState) => state.weather.weatherData);
    return (
        <div className="flex flex-col my-2 gap-4">
            {searchResults.map((result) => (
                <div
                    key={result.id}
                    className="relative flex rounded-lg shadow-md cursor-pointer items-center"
                    onClick={() => dispatch(setWeatherData(result))}
                >
                    <div className="absolute flex flex-row rounded-xl shadow-md bg-[#dee2e6] justify-start items-center gap-2 px-3 py-2 w-[175px] h-[50px] z-30">
                        <div className="text-lg font-semibold">{result.name}</div>
                        <div className="text-sm font-light">{result.sys.country}</div>
                    </div>
                    <div className="absolute flex justify-end bg-[#fff] rounded-xl items-center text-base px-3 py-2 w-[250px] h-[50px] z-20">{result.main.temp}°C</div>
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
