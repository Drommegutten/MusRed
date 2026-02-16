function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

export const dataset = assertValue(
  import.meta.env.VITE_SANITY_DATASET,
  "Missing environment variable: VITE_SANITY_DATASET"
);

export const projectId = assertValue(
  import.meta.env.VITE_SANITY_PROJECT_ID,
  "Missing environment variable: VITE_SANITY_PROJECT_ID"
);

/**
 * see https://www.sanity.io/docs/api-versioning
 */
export const apiVersion =
  import.meta.env.VITE_SANITY_API_VERSION || "2024-10-28";

/**
 * Optional in Vite, mostly used for Studio links
 */
export const studioUrl =
  import.meta.env.VITE_SANITY_STUDIO_URL || "http://localhost:3333";
