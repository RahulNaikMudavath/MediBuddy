function getFirstValue(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return "Not available";
  }

  return value[0] || "Not available";
}

function MedicineCard({ medicine }) {
  const openfda = medicine?.openfda;

  return (
    <article>
      <h2>
        {getFirstValue(openfda?.brand_name)}
      </h2>

      <p>
        <strong>Generic:</strong>{" "}
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
    </article>
  );
}

export default MedicineCard;