import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { ErrorHandler } from "../utils/errorHandler";
import { HandledError } from "../api/types/error.type";
import { ErrorDisplay } from "./ErrorDisplay";
import { getWeatherData } from "../api/APIFunction";

const SearchAndCityList: React.FC = () => {
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
      setError((handledError as HandledError).message || "An error occurred while fetching data.");
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
      {error && <ErrorDisplay errorMessage={error} />}
      {!loading && !error && searchResults.length === 0 && searchTerm.trim() && (
        <div className="text-gray-500">No data found for your search.</div>
      )}
      <SearchResults searchResults={searchResults} dispatch={dispatch} />
    </main>
  );
};

export default SearchAndCityList;