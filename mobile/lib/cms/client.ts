const DEFAULT_BASE = "https://merch30praum.vercel.app";

export function getApiBase(): string {
  return (process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_BASE).replace(/\/$/, "");
}

export async function payloadFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getApiBase()}/api/payload${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: { Accept: "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    throw new Error(`CMS ${res.status} on ${url}`);
  }
  return (await res.json()) as T;
}

export interface PayloadFindResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
