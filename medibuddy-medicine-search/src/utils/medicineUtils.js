export function getFirstValue(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return "Not available";
  }

  return value[0] || "Not available";
}

export function getAllValues(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return "Not available";
  }

  return value.filter(Boolean).join(", ");
}