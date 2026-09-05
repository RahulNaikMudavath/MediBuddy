import { useEffect, useState } from "react";
import { searchMedicines } from "../services/medicineApi";
import MedicineCard from "../components/MedicineCard";
import useDebounce from "../hooks/useDebounce";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const delayedQuery = useDebounce(query, 400);

  useEffect(() => {
    const text = delayedQuery.trim();

    if (!text) {
      setMedicines([]);
      setSearchedQuery("");
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function loadMedicines() {
      setLoading(true);
      setError(null);
      setSearchedQuery(text);

      try {
        const results = await searchMedicines(
          text,
          controller.signal
        );

        setMedicines(results);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setMedicines([]);

        if (error.message === "NETWORK_ERROR") {
          setError(
            "Unable to connect to the FDA service."
          );
        } else if (error.message === "RATE_LIMIT") {
          setError(
            "Too many requests. Please try again later."
          );
        } else if (error.message === "SERVER_ERROR") {
          setError(
            "FDA service is temporarily unavailable."
          );
        } else {
          setError(
            "Something went wrong. Please try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadMedicines();

    return () => {
      controller.abort();
    };
  }, [delayedQuery]);

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

        {loading && (
          <div className="state-message">
            <p>Searching for medicines...</p>
          </div>
        )}
      </div>

      {!loading && error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {!loading &&
        !error &&
        searchedQuery &&
        medicines.length === 0 && (
          <div className="state-message">
            <h2>No results found</h2>
            <p>
              No medicines found for "{searchedQuery}".
            </p>
          </div>
        )}

      {!loading && !error && medicines.length > 0 && (
        <div className="medicine-list">
          {medicines.map((medicine, index) => (
            <MedicineCard
              key={
                medicine?.openfda?.spl_id?.[0] ||
                medicine?.openfda?.product_ndc?.[0] ||
                index
              }
              medicine={medicine}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;