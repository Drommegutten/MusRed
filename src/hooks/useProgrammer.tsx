import { useQuery } from "@tanstack/react-query";
import { getProgrammerInfo } from "../sanity/queries/sanityFetching";

export function useProgrammer() {
  return useQuery({
    queryKey: ["programmer"],
    queryFn: getProgrammerInfo,
    staleTime: 1000 * 60 * 5,
  });
}