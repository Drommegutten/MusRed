import { useInfiniteQuery } from "@tanstack/react-query";
import { getForumPosts } from "../queries/forumQuery";

export function usePosts(limit = 30, enabled = true) {
    return useInfiniteQuery({
        queryKey: ["post"],
        queryFn: ({ pageParam = 0 }) =>
            getForumPosts({ start: pageParam, limit }),
            getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < limit) return undefined;
            return allPages.length * limit; 
        },
        enabled,
        staleTime: 1000 * 60 * 5,
        initialPageParam: 0, 
  });
}