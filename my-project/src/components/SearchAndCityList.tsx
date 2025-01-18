import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setWeatherData } from '../redux/WeatherSlice';

function SearchAndCityList() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const dispatch = useDispatch();

    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timeoutId: NodeJS.Timeout;
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

    return (
        <main className="flex flex-col bg-[#e9ecef] shadow-lg absolute right-0 bottom-10 top-28 p-5 text-black rounded-tl-2xl rounded-bl-2xl gap-8">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
                <input
                    placeholder="Search city..."
                    className="bg-[#f8f9fa] rounded-2xl w-[300px] h-[35px] p-6 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.2)]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="bg-[#212529] text-white rounded-2xl px-4 py-2 hover:bg-[#495057] transition">
                    Search
                </button>
            </form>

            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}

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
        </main>
    );
}

export default SearchAndCityList;
