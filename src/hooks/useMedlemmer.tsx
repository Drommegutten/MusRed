import { useQuery } from "@tanstack/react-query";
import { getMedlemmerInfo } from "../sanity/queries/sanityFetching";

export function useMedlemmer() {
  return useQuery({
    queryKey: ["medlemmer"],
    queryFn: getMedlemmerInfo,
    staleTime: 1000 * 60 * 5,
  });
}