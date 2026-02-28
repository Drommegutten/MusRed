import { useEffect, useState } from "react";
import type { Program } from "../../interfaces/programmer";
import { getProgrammerInfo } from "../../sanity/queries/sanityFetching";
import { useNavigate } from "react-router-dom";

function Programmer() {
  const [programmerData, setProgrammerData] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showElements, setShowElements] = useState(false);

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

    useEffect(() => {
      setShowElements(true);
    }, []); 

    if (loading) {
      return (
        <div className="flex flex-col items-center h-screen mt-30 mb-30 mr-10 ml-10">
          <h1 className="text-4xl font-bold mb-4">LOADER...</h1>
        </div>
      );
    }

    return (
        <div className={`flex flex-col items-center h-screen mt-30 mb-30 mr-10 ml-10 transition-opacity duration-700 ${showElements ? "opacity-100" : "opacity-0"}`}>
            <h1 className="text-4xl font-bold mb-4">PROGRAMMER</h1>
            <div className="self-start cursor-pointer grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-col items-center justify-center">
                {programmerData.map((program, index) => (
                    <div key={index} className="p-0 flex bg-white shadow-lg w-full max-h-70"
                        onClick={() => navigate(`/programmer/${program.slug.current}`)}>
                        <img src={program.bilde.asset.url} alt={program.programNavn} className=" object-contain" />
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default Programmer;