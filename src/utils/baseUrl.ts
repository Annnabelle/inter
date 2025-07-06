export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


export function normalizeUrl(uri: string) {
  return new URL(uri, BASE_URL).toString();
}