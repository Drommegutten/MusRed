import { useMedlemmer } from "../../hooks/useMedlemmer";
import SingleMedlem from "./SingleMedlem";
import { useRef, useEffect } from "react";

function TidligereMedlemmer() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMedlemmer(10);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      { rootMargin: "200px" } // start fetching a bit before reaching bottom
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <div className="w-screen min-h-screen" />;

  return (
    <div className="flex flex-col items-center mt-30">
      <h1 className="text-4xl font-bold mb-4 text-center">MUSREDDERE</h1>

      <div className="background-gradient p-6 w-full">
        {data?.pages.map((page, pageIndex) =>
          page.map((medlem: any, index: number) => (
            <SingleMedlem key={`${pageIndex}-${index}`} medlem={medlem} index={index} />
          ))
        )}
      </div>

      {/* Sentinel element to trigger fetching more */}
      <div ref={loadMoreRef} className="h-1" />

      {isFetchingNextPage && <div className="text-center p-2">Loading more...</div>}
    </div>
  );
}

export default TidligereMedlemmer;