import { useState } from "react";
import { searchMedicines } from "../services/medicineApi";
import MedicineCard from "../components/MedicineCard";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setMedicines([]);
      setSearchedQuery("");
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setSearchedQuery(trimmedQuery);

    try {
      const results = await searchMedicines(trimmedQuery);
      setMedicines(results);
    } catch (error) {
      console.error(error);

      if (error.name === "AbortError") {
        return;
      }

      setMedicines([]);

      switch (error.message) {
        case "NETWORK_ERROR":
          setError(
            "Unable to connect to the FDA service. Please check your internet connection."
          );
          break;

        case "RATE_LIMIT":
          setError(
            "Too many requests. Please wait a moment and try again."
          );
          break;

        case "SERVER_ERROR":
          setError(
            "The FDA service is temporarily unavailable. Please try again later."
          );
          break;

        default:
          setError(
            "Something went wrong while searching. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Medicine Search</h1>

      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search medicine brand..."
        />

        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && (
        <div>
          <p>Searching for medicines...</p>
        </div>
      )}

      {!loading && error && (
        <div>
          <p>{error}</p>
          <button onClick={handleSearch}>Try Again</button>
        </div>
      )}

      {!loading &&
        !error &&
        searchedQuery &&
        medicines.length === 0 && (
          <div>
            <h2>No results found</h2>
            <p>
              We couldn't find any medicines matching "{searchedQuery}".
            </p>
          </div>
        )}

      {!loading && !error && medicines.length > 0 && (
        <div className="medicine-list">
          {medicines.map((medicine, index) => (
            <MedicineCard
              key={index}
              medicine={medicine}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;