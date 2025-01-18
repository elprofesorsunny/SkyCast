import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import CityList from './CityList';

function SearchAndCityList() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);

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

        const apiKey = 'ef827831237dbae7257b7b7499242373';
        const url = `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            setSearchResults(response.data.list || []);
        } catch (error) {
            setError('Failed to fetch search results');
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

    const handleSearchChange = (value: string) => setSearchTerm(value);
    const handleSearchSubmit = (event: React.FormEvent) => event.preventDefault();

    return (
        <main className="flex flex-col bg-[#e9ecef] shadow-lg absolute right-0 bottom-10 top-28 p-5 text-black rounded-tl-2xl rounded-bl-2xl gap-8">
            <SearchForm
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
            />
            <CityList
                searchResults={searchResults}
                loading={loading}
                error={error}
            />
        </main>
    );
}

export default SearchAndCityList;
