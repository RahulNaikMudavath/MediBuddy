function MedicineCard({ medicine, onSelect }) {
  return (
    <article>
      <h2>{medicine.name}</h2>
      {medicine.description && <p>{medicine.description}</p>}
      {onSelect && (
        <button type="button" onClick={() => onSelect(medicine)}>
          View details
        </button>
      )}
    </article>
  )
}

export default MedicineCard
