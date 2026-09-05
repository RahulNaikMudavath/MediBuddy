export function normalizeMedicine(medicine) {
  return {
    ...medicine,
    name: medicine.name?.trim() ?? 'Unnamed medicine',
    description: medicine.description?.trim() ?? '',
  }
}

export function formatMedicineName(name = '') {
  return name
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase())
}
