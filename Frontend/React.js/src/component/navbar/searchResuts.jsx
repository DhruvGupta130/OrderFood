import { useSelector } from 'react-redux';
import SearchResultCard from './searchResultCard';
import { CircularProgress } from "@mui/material";

const SearchResults = () => {
    const { search, loading, error } = useSelector(state => state.menu);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <CircularProgress size={50} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center py-4 font-semibold">
                Error: {error.message}
            </div>
        );
    }

    if (search.length === 0) {
        return (
            <div className="text-gray-500 text-center py-4">
                No results found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center items-center">
            {search.map(item => (
                <div key={item.id} className="transition-transform transform hover:scale-105 flex justify-center">
                    <SearchResultCard item={item} />
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
