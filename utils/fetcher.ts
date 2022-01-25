import { mutate } from "swr";

/**
 * Data fetcher for SWR.
 * @param key
 */
export const fetcher = (key: string) =>
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${key}`, { method: "GET" }).then(
    (t) => t.json()
  );

/**
 * Post data to key and revalidate with that key.
 * @param key
 * @param body
 */
export const poster = (key: string, body: any, headers = {}) =>
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    // credentials: "include",
  })
    .then((t) => t.json())
    .then((d) => mutate(key).then(() => d));
