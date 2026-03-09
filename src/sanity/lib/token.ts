export const tokenWrite = import.meta.env.VITE_SANITY_API_WRITE_TOKEN;

if (!tokenWrite) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN");
}