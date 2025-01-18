import React from 'react';
import { useDispatch } from 'react-redux';
import { setWeatherData } from '../redux/WeatherSlice';

interface CityListProps {
    searchResults: any[];
    loading: boolean;
    error: string | null;
}

const CityList: React.FC<CityListProps> = ({ searchResults, loading, error }) => {
    const dispatch = useDispatch();

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

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

export default CityList;
