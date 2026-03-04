import { useEffect, useState } from "react";
import { getMedlemmerInfo } from "../../sanity/queries/sanityFetching";
import  SingleMedlem  from "./SingleMedlem"
import { useQuery } from "@tanstack/react-query";
import { useMedlemmer } from "../../hooks/useMedlemmer";


function Medlemmer() {
  const [showElements, setShowElements] = useState(false);

  const { data, isLoading} = useMedlemmer();


  useEffect(() => {
    if (!isLoading && data) {
      setShowElements(true);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <div className="w-screen min-h-screen" />;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center w-screen h-full mt-30 transition-opacity duration-1000 ${
        showElements ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-4xl font-bold transition-all duration-700 ease-out">
        AKTIVE OG PANG I MUSRED
      </h1>

      <div className="background-gradient p-6">
        {data?.map((medlem, index) => (
          <SingleMedlem
            key={index} 
            medlem={medlem}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Medlemmer;