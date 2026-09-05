import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMedicineById } from "../services/medicineApi";
import { getAllValues, getFirstValue } from "../utils/medicineUtils";

function MedicineDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMedicine() {
      try {
        const result = await getMedicineById(
          decodeURIComponent(id),
          controller.signal,
        );

        if (!result) {
          setError("Medicine not found");
          return;
        }

        setMedicine(result);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError("Unable to load medicine");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMedicine();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p>Loading medicine...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <button onClick={() => navigate("/")}>Back to Search</button>
      </div>
    );
  }

  const openfda = medicine.openfda;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{getFirstValue(openfda?.brand_name)}</h1>

      <p>Generic: {getFirstValue(openfda?.generic_name)}</p>
      <p>Manufacturer: {getFirstValue(openfda?.manufacturer_name)}</p>
      <p>Product Type: {getFirstValue(openfda?.product_type)}</p>
      <p>Route: {getAllValues(openfda?.route)}</p>

      {medicine.indications_and_usage?.length > 0 && (
        <section>
          <h2>Indications &amp; Usage</h2>
          <p>{getAllValues(medicine.indications_and_usage)}</p>
        </section>
      )}

      {medicine.dosage_and_administration?.length > 0 && (
        <section>
          <h2>Dosage &amp; Administration</h2>
          <p>{getAllValues(medicine.dosage_and_administration)}</p>
        </section>
      )}

      {medicine.warnings?.length > 0 && (
        <section>
          <h2>Warnings</h2>
          <p>{getAllValues(medicine.warnings)}</p>
        </section>
      )}
    </div>
  );
}

export default MedicineDetailPage;