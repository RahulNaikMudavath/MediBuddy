const API_BASE_URL = import.meta.env.VITE_MEDICINE_API_URL ?? ''

export async function searchMedicines(query) {
  if (!API_BASE_URL || !query.trim()) {
    return []
  }

  const response = await fetch(
    `${API_BASE_URL}/medicines?search=${encodeURIComponent(query.trim())}`,
  )

  if (!response.ok) {
    throw new Error('Medicine search failed')
  }

  return response.json()
}

export async function getMedicineById(id) {
  if (!API_BASE_URL) {
    return null
  }

  const response = await fetch(`${API_BASE_URL}/medicines/${encodeURIComponent(id)}`)

  if (!response.ok) {
    throw new Error('Medicine details could not be loaded')
  }

  return response.json()
}
