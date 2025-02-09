import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SearchForm from "./Search";
import SearchResults from "./Result";
import { getWeatherData } from "@api/APIFunction";
import { handleError } from "@utils/errorHandler";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

const SearchAndResult: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const prevSearchTerm = useRef<string>("");
  const { promiseInProgress } = usePromiseTracker();

  const fetchSearchResults = useCallback(async (query: string) => {
    if (query.length < 3) return;

    try {
      const response = await trackPromise(getWeatherData(query));
      const results: any = response.data;
      setSearchResults(results);
    } catch (err: any) {
      handleError(err);
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
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} loading={promiseInProgress} />
      <SearchResults searchResults={searchResults} dispatch={dispatch} />
      {!promiseInProgress && searchResults.length === 0 && searchTerm.trim() && (
        <div className="text-center text-gray-500 mt-4">No data available</div>
      )}
    </main>
  );
};

export default React.memo(SearchAndResult);