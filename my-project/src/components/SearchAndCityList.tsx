import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import WeatherAPI from "../services/WeatherAPI";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import ErrorDisplay from "./ErrorDisplay";
import { ErrorHandler } from "../services/ErrorHandler";

const SearchAndCityList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

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
    } catch (err: unknown) {
      const handledError = ErrorHandler.handle(err);
      setError(handledError.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSearchResults = useCallback(
    debounce(fetchSearchResults, 500),
    []
  );

  useEffect(() => {
    const initialSearchTerm = searchParams.get("query");
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
      fetchSearchResults(initialSearchTerm);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchTerm.trim()) {
      debouncedFetchSearchResults(searchTerm);
      setSearchParams({ query: searchTerm });
    } else {
      setSearchResults([]);
      setSearchParams({});
    }
  }, [searchTerm]);

  return (
    <main className="flex flex-col bg-[#e9ecef] shadow-lg absolute right-0 bottom-10 top-28 p-5 text-black rounded-tl-2xl rounded-bl-2xl gap-6">
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading && <div>Loading...</div>}
      {error && <ErrorDisplay error={error} />}
      {!loading && !error && searchResults.length === 0 && searchTerm.trim() && (
        <div className="text-gray-500">No data found for your search.</div>
      )}
      <SearchResults searchResults={searchResults} dispatch={dispatch} />
    </main>
  );
};

export default SearchAndCityList;
