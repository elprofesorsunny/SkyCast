interface SearchFormProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
            <input
                placeholder="Search city..."
                className="bg-[#f8f9fa] rounded-2xl w-[300px] h-[35px] p-6 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.2)]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
    );
};

export default SearchForm;
