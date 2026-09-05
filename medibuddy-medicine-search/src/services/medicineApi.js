const BASE_URL = "https://api.fda.gov/drug/label.json";

const cache = new Map();

export async function searchMedicines(query, signal) {
  const text = query.trim();

  if (!text) {
    return [];
  }

  const key = text.toLowerCase();

  if (cache.has(key)) {
    return cache.get(key);
  }

  const params = new URLSearchParams({
    search: `openfda.brand_name:"${text}"`,
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

    throw new Error("NETWORK_ERROR");
  }

  if (response.status === 404) {
    cache.set(key, []);
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
  const results = Array.isArray(data.results)
    ? data.results
    : [];

  cache.set(key, results);

  return results;
}

export async function getMedicineById(id, signal) {
  const params = new URLSearchParams({
    search: `openfda.spl_id:"${id}"`,
  });

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`,
    { signal }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("FAILED_TO_LOAD");
  }

  const data = await response.json();

  return data.results?.[0] || null;
}