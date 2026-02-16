import React, { useEffect, useState } from "react";
import type { Program } from "../../interfaces/programmer";
import { getProgrammerInfo } from "../../sanity/queries/sanityFetching";

function Programmer() {
  const [programmerData, setProgrammerData] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getProgrammerInfo();
          setProgrammerData(data);
        } catch (error) {
          console.error("Failed to fetch medlemmer:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    console.log(programmerData);

    return (
        <div className="flex flex-col items-center justify-center h-screen m-10">
            <h1 className="text-4xl font-bold mb-4">Programmer</h1>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-col items-center justify-center overflow-auto">
                {programmerData.map((program, index) => (
                    <div key={index} className="p-0 flex bg-white shadow-md ">
                        <img src={program.bilde.asset.url} alt={program.programNavn} className="w-full max-h-full object-cover" />
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default Programmer;