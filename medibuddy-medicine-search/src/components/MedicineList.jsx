import MedicineCard from './MedicineCard.jsx'

function MedicineList({ medicines, onSelect }) {
  return (
    <section aria-label="Medicine results">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.id ?? medicine.name}
          medicine={medicine}
          onSelect={onSelect}
        />
      ))}
    </section>
  )
}

export default MedicineList
