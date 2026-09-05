export function normalizeMedicine(medicine) {
  return {
    ...medicine,
    name: medicine.name?.trim() ?? 'Unnamed medicine',
    description: medicine.description?.trim() ?? '',
  }
}

export function getFirstValue(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return 'Not available'
  }

  return value[0] || 'Not available'
}

export function formatMedicineName(name = '') {
  return name
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase())
}
