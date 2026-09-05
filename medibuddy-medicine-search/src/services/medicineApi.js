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

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`,
    {
      signal,
    }
  );

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(
      `FDA API request failed: ${response.status}`
    );
  }

  const data = await response.json();

  return data.results || [];
}