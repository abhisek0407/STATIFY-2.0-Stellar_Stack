const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export async function getMatches() {
    const response = await fetch(`${API_BASE_URL}/matches`);

    if (!response.ok) {
        throw new Error("Failed to fetch matches");
    }

    return await response.json();
}