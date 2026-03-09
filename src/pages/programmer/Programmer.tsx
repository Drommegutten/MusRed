import { useEffect, useState } from "react";
import { getProgrammerInfo } from "../../sanity/queries/sanityFetching";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function Programmer() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showElements, setShowElements] = useState(false);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["programmer"],
    queryFn: getProgrammerInfo,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setLoading(false);
    }
  }, [isLoading, data]);

  useEffect(() => {
    setShowElements(true);
  }, []); 

  if (error) {
    return <div>Noe gikk galt</div>;
  }

  if (!loading) {

  return (
      <div className={`flex flex-col items-center h-full mt-30 mr-10 ml-10 transition-opacity duration-700 ${showElements ? "opacity-100" : "opacity-0"}`}>
          <h1 className="text-4xl font-bold mb-4">PROGRAMMER</h1>
          <div className="self-start cursor-pointer grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-col items-center justify-center">
              {data?.map((program, index) => (
                  <div key={index} className="p-0 flex bg-white shadow-lg w-full max-h-70"
                      onClick={() => navigate(`/programmer/${program.slug.current}`)}>
                      <img src={program.bilde.asset.url} alt={program.programNavn} className=" object-contain" />
                  </div>
              ))}
              
          </div>
      </div>
  );
}
}

export default Programmer;