import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllValues, getFirstValue } from "../utils/medicineUtils";

function MedicineDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const medicine = location.state?.medicine;

  if (!medicine) {
    return (
      <div className="detail-page">
        <h1>Medicine Not Found</h1>

        <p>
          This medicine is no longer available in the current search results.
        </p>

        <button onClick={() => navigate("/")}>
          Back to Search
        </button>
      </div>
    );
  }

  const openfda = medicine.openfda;

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)}>
        ← Back to Search
      </button>

      <h1>{getFirstValue(openfda?.brand_name)}</h1>

      <div className="detail-section">
        <h2>Basic Information</h2>

        <p>
          <strong>Generic Name:</strong>{" "}
          {getFirstValue(openfda?.generic_name)}
        </p>

        <p>
          <strong>Manufacturer:</strong>{" "}
          {getFirstValue(openfda?.manufacturer_name)}
        </p>

        <p>
          <strong>Product Type:</strong>{" "}
          {getFirstValue(openfda?.product_type)}
        </p>

        <p>
          <strong>Route:</strong>{" "}
          {getAllValues(openfda?.route)}
        </p>

        <p>
          <strong>Substance:</strong>{" "}
          {getAllValues(openfda?.substance_name)}
        </p>

        <p>
          <strong>Product NDC:</strong>{" "}
          {getAllValues(openfda?.product_ndc)}
        </p>
      </div>

      {medicine.active_ingredient?.length > 0 && (
        <div className="detail-section">
          <h2>Active Ingredient</h2>
          <p>{getAllValues(medicine.active_ingredient)}</p>
        </div>
      )}

      {medicine.purpose?.length > 0 && (
        <div className="detail-section">
          <h2>Purpose</h2>
          <p>{getAllValues(medicine.purpose)}</p>
        </div>
      )}

      {medicine.indications_and_usage?.length > 0 && (
        <div className="detail-section">
          <h2>Indications and Usage</h2>
          <p>{getAllValues(medicine.indications_and_usage)}</p>
        </div>
      )}

      {medicine.dosage_and_administration?.length > 0 && (
        <div className="detail-section">
          <h2>Dosage and Administration</h2>
          <p>{getAllValues(medicine.dosage_and_administration)}</p>
        </div>
      )}

      {medicine.warnings?.length > 0 && (
        <div className="detail-section">
          <h2>Warnings</h2>
          <p>{getAllValues(medicine.warnings)}</p>
        </div>
      )}

      {medicine.contraindications?.length > 0 && (
        <div className="detail-section">
          <h2>Contraindications</h2>
          <p>{getAllValues(medicine.contraindications)}</p>
        </div>
      )}

      {medicine.adverse_reactions?.length > 0 && (
        <div className="detail-section">
          <h2>Adverse Reactions</h2>
          <p>{getAllValues(medicine.adverse_reactions)}</p>
        </div>
      )}

      {medicine.drug_interactions?.length > 0 && (
        <div className="detail-section">
          <h2>Drug Interactions</h2>
          <p>{getAllValues(medicine.drug_interactions)}</p>
        </div>
      )}
    </div>
  );
}

export default MedicineDetailPage;