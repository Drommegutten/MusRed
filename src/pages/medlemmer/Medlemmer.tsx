import { useEffect, useState } from "react";
import type { Medlem } from "../../interfaces/medlemmer";
import { getMedlemmerInfo } from "../../sanity/queries/sanityFetching";
import  SingleMedlem  from "./SingleMedlem"


function Medlemmer() {
  const [medlemmerData, setMedlemmerData] = useState<Medlem[]>([]);
  const [showElements, setShowElements] = useState(false);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMedlemmerInfo();
        setMedlemmerData(data);
      } catch (error) {
        console.error("Failed to fetch medlemmer:", error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowElements(true);
    }
  }, [loading]);

  if (loading) {
    return <div className="w-screen min-h-screen" />;
  }

  

  return (
    <div className={`flex flex-col items-center justify-center w-screen h-full mt-30 transition-opacity duration-1000 ${showElements ? "opacity-100" : "opacity-0"}`}>

      <h1 className={`text-4xl font-bold transition-all duration-700 ease-out `}>
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
