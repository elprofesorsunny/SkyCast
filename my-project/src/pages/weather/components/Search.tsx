import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { SearchFormProps } from '@types/search';

const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, setSearchTerm, loading }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()} className="relative flex gap-3 items-center">
            <input
                placeholder="Search city..."
                className="bg-[#f8f9fa] rounded-2xl w-[300px] h-[35px] p-6 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.2)] pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading && (
                <FaSpinner className="absolute right-3 animate-spin text-gray-500" />
            )}
        </form>
    );
};

export default SearchForm;