import { useState } from "react";
import { searchMedicines } from "../services/medicineApi";
import MedicineCard from "../components/MedicineCard";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await searchMedicines(query);
      setMedicines(results);
    } catch (error) {
      console.error("ERROR:", error);
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

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="medicine-list">
        {medicines.map((medicine, index) => (
          <MedicineCard
            key={index}
            medicine={medicine}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;