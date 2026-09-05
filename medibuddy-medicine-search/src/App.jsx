import { Routes, Route } from "react-router-dom";

import SearchPage from "./pages/SearchPage";
import MedicineDetailPage from "./pages/MedicineDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />

      <Route
        path="/medicine/:id"
        element={<MedicineDetailPage />}
      />
    </Routes>
  );
}

export default App;