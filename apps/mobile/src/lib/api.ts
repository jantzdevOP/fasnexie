/**
 * Lightweight API client for FasNexi mobile.
 * Uses EXPO_PUBLIC_API_URL when available.
 */

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `API ${response.status}${body ? `: ${body.slice(0, 120)}` : ''}`,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error('Failed to parse response as JSON');
  }
}
