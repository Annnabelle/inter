export const BASE_URL = 'http://localhost:4000'

export function normalizeUrl(uri: string) {
  return new URL(uri, BASE_URL).toString();
}
