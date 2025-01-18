import React from 'react';

interface SearchFormProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: (event: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
    return (
        <form onSubmit={onSearchSubmit} className="flex gap-3">
            <input
                placeholder="Search city..."
                className="bg-[#f8f9fa] rounded-2xl w-[300px] h-[35px] p-6 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.2)]"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <button type="submit" className="bg-[#212529] text-white rounded-2xl px-4 py-2 hover:bg-[#495057] transition">
                Search
            </button>
        </form>
    );
};

export default SearchForm;
