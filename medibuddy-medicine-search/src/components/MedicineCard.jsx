import { useNavigate } from "react-router-dom";
import { getFirstValue } from "../utils/medicineUtils";

function MedicineCard({ medicine }) {
  const navigate = useNavigate();
  const openfda = medicine?.openfda;
  const id = openfda?.spl_id?.[0];

  const handleClick = () => {
    navigate(`/medicine/${encodeURIComponent(id)}`);
  };

  return (
    <article
      className="medicine-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleClick();
        }
      }}
    >
      <h2>{getFirstValue(openfda?.brand_name)}</h2>

      <div className="medicine-info">
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
          {getFirstValue(openfda?.route)}
        </p>
      </div>
    </article>
  );
}

export default MedicineCard;