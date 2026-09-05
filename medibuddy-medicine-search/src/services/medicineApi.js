const BASE_URL = "https://api.fda.gov/drug/label.json";

export async function searchMedicines(query, signal) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const params = new URLSearchParams({
    search: `openfda.brand_name:"${trimmedQuery}"`,
    limit: "20",
  });

  let response;

  try {
    response = await fetch(`${BASE_URL}?${params.toString()}`, {
      signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

      throw new Error("NETWORK_ERROR", { cause: error });
  }

  if (response.status === 404) {
    return [];
  }

  if (response.status === 429) {
    throw new Error("RATE_LIMIT");
  }

  if (response.status >= 500) {
    throw new Error("SERVER_ERROR");
  }

  if (!response.ok) {
    throw new Error("UNKNOWN_ERROR");
  }

  const data = await response.json();

  return Array.isArray(data.results) ? data.results : [];
}

export async function getMedicineById(id, signal) {
  const params = new URLSearchParams({
    search: `openfda.spl_id:"${id}"`,
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`, {
    signal,
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch medicine");
  }

  const data = await response.json();

  return data.results?.[0] || null;
}