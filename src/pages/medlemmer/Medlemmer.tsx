import React, { useEffect, useState } from "react";
import type { Medlem } from "../../interfaces/medlemmer";
import { getMedlemmerInfo } from "../../sanity/queries/sanityFetching";
import slimeFunk from "../../assets/FUNK.png";

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
          <div key={index} className="mb-4 p-4 border rounded-lg bg-white">

            <h1 className="text-3xl font-semibold text-center"> {medlem.medlemNavn}</h1>

            <div className= "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"> 
              <div className="align-middle flex flex-col items-center justify-center relative"> 
                <img src={medlem.medlemBilde.asset.url} alt={medlem.medlemNavn} className="h-70 w-100 object-cover"/>
                  {medlem.varFunk ? (
                    <div className="h-33 w-100 z-10 overflow-hidden bottom-10 relative">
                      <img src={slimeFunk} alt="Slime Funk" className="object-cover object-top h-33 w-100 "/>
                    </div>
                  ) : null}

                <div className="flex flex-row"> 
                  <h2 className="mr-10">{medlem.tattOpp} </h2>
                  <h2>{medlem.forlot} </h2>
                </div>

              </div>

              <div className="flex flex-col col-span-2 ">
                  <img src={medlem.programTilhorighet.bilde.asset.url} alt={medlem.programTilhorighet.programNavn} className="w-100% max-h-100 object-cover"/>
                  {medlem.tattOppAv?.medlemNavn && (
                                                      <div className="flex flex-row items-center mr-10 justify-end">
                                                        
                                                        <h2 className="mr-10">
                                                          Tatt opp av:
                                                        </h2>

                                                        <img
                                                          src={medlem.tattOppAv.medlemBilde?.asset?.url}
                                                          alt={medlem.tattOppAv.medlemNavn}
                                                          className="w-20 h-20 object-cover rounded-full"
                                                        />
                                                      </div>
                                                    )}
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Medlemmer;
