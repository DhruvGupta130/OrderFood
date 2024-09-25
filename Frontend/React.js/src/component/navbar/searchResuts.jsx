import { useSelector } from 'react-redux';
import SearchResultCard from './searchResultCard';

const SearchResults = () => {
    const { search, loading, error } = useSelector(state => state.menu);

    // Loading state
    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    // Error state
    if (error) {
        return <div className="text-red-500 text-center py-4">Error: {error.message}</div>;
    }

    // Display search results
    return (
        <div className="p-4">
            {search.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {search.map(item => (
                        <SearchResultCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-4">No results found.</div>
            )}
        </div>
    );
};

export default SearchResults;
