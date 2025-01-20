import { Dispatch } from 'redux';
import { setWeatherData } from '../redux/WeatherSlice';
import React from "react";

interface SearchResultsProps {
    searchResults: any[];
    dispatch: Dispatch;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, dispatch }) => {
    return (
        <div className="flex flex-col gap-3">
            {searchResults.map((result) => (
                <div
                    key={result.id}
                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                    onClick={() => dispatch(setWeatherData(result))}
                >
                    <h3 className="text-lg font-semibold">{result.name}</h3>
                    <p className="text-sm">Country: {result.sys.country}</p>
                    <p className="text-sm">Temperature: {result.main.temp}°C</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
