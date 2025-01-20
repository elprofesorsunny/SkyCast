import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import WeatherAPI from '../services/WeatherAPI';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

interface SearchAndCityListProps {
    setWeatherData: (data: any) => void;
}

const SearchAndCityList: React.FC<SearchAndCityListProps> = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const dispatch = useDispatch();

    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const fetchSearchResults = async (query: string) => {
        if (query.length < 3) return;

        setLoading(true);
        setError(null);

        try {
            const results = await WeatherAPI.searchCity(query);
            setSearchResults(results);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 500), []);

    useEffect(() => {
        if (searchTerm.trim()) {
            debouncedFetchSearchResults(searchTerm);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <main className="flex flex-col bg-[#e9ecef] shadow-lg absolute right-0 bottom-10 top-28 p-5 text-black rounded-tl-2xl rounded-bl-2xl gap-8">
            <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}

            {!loading && !error && searchResults.length === 0 && searchTerm.trim() && (
                <div className="text-gray-500">No data found for your search.</div>
            )}

            <SearchResults searchResults={searchResults} dispatch={dispatch} />
        </main>
    );
}

export default SearchAndCityList;
