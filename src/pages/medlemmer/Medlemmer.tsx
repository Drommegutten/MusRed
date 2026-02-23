import React, { useEffect, useState } from "react";
import type { Medlem } from "../../interfaces/medlemmer";
import { getMedlemmerInfo } from "../../sanity/queries/sanityFetching";
import  SingleMedlem  from "./SingleMedlem"


function Medlemmer() {
  const [medlemmerData, setMedlemmerData] = useState<Medlem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMedlemmerInfo();
        setMedlemmerData(data);
      } catch (error) {
        console.error("Failed to fetch medlemmer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Medlemmer data:", medlemmerData);

  

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full">

      <h1 className="text-4xl font-bold mt-10">
        Aktive og panger i musred
      </h1>

      <div className="mt-8 background-gradient p-6 shadow-lg ">
        {medlemmerData.map((medlem, index) => (
          <SingleMedlem
            medlem={medlem}
            index={index}
          />
        ))}
      </div>
      
      
    </div>
  );
}

export default Medlemmer;
