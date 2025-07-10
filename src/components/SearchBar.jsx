function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value.trim();
    if (city) {
      onSearch(city);
      e.target.reset();
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          name="city"
          placeholder="Enter city name"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;