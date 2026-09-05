import { useState } from "react";
import { searchMedicines } from "../services/medicineApi";

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
    <div>
      <h1>Medicine Search</h1>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search medicine brand..."
      />

      <button onClick={handleSearch}>
        Search
      </button>

      <div>
        {medicines.map((medicine, index) => (
          <div key={index}>
            <pre>
              {JSON.stringify(medicine.openfda, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;