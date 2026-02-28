import { useEffect, useState } from "react";
import type { Medlem } from "../../interfaces/medlemmer";
import { getMedlemmerInfo } from "../../sanity/queries/sanityFetching";
import  SingleMedlem  from "./SingleMedlem"


function Medlemmer() {
  const [medlemmerData, setMedlemmerData] = useState<Medlem[]>([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setShowTitle(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMedlemmerInfo();
        setMedlemmerData(data);
      } catch (error) {
        console.error("Failed to fetch medlemmer:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Medlemmer data:", medlemmerData);

  

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full mt-30">

      <h1 className={`text-4xl font-bold transition-all duration-700 ease-out ${
                showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y"}`}>
        AKTIVE OG PANG I MUSRED
      </h1>

      <div className=" background-gradient p-6 ">
        {medlemmerData.map((medlem, index) => (
          <SingleMedlem
            key={`${medlem.medlemNavn}-${index}`}
            medlem={medlem}
            index={index}
          />
        ))}
      </div>
      
      
    </div>
  );
}

export default Medlemmer;
