import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./api";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});