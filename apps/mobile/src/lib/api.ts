export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, init);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error('Failed to parse response as JSON');
  }
}
