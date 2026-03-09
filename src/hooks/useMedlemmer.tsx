import { getTidligereMedlemmer } from "../queries/medlemmer";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useMedlemmer(limit = 10) {
  return useInfiniteQuery({
    queryKey: ["tidligereMedlemmer"],
    queryFn: ({ pageParam = 0 }) =>
      getTidligereMedlemmer({ start: pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit; 
    },
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0, 
  });
}