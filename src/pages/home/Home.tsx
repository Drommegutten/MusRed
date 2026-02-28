import LogoHuge from "../../assets/3.png";
import LogoDollar from "../../assets/1.png"
import React from "react";
import Carousel from "../../components/carousel/Carousel";
import { getProgrammerInfo } from "../../sanity/queries/sanityFetching";
import { useEffect, useState } from "react";
import type { Program } from "../../interfaces/programmer";


function Home({onCarouselClick }: {onCarouselClick: () => void}) {
    const [hover, setHover] = React.useState(false);
    const [showElements, setShowElements] = useState(false);
    useEffect(() => {
      setShowElements(true);
    }, []);

    const [programmerData, setProgrammerData] = useState<Program[]>([]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getProgrammerInfo();
          setProgrammerData(data);
        } catch (error) {
          console.error("Failed to fetch programmer:", error);
        }
      };
    
        fetchData();
      }, []);

      const slides = programmerData.map((program) => ({
        image: program.bilde.asset.url,
        title: program.programNavn,
        slug: program.slug.current,
      }));

    return (
        <div className={`flex flex-col items-center h-screen justify-center transition-opacity duration-1000 
        ${showElements ? "opacity-100" : "opacity-0"}`}> 
            <div className={`flex flex-col justify-center items-center w-200 h-105 fixed bottom-70 transition-opacity duration-700 `} 
                  onClick={onCarouselClick}>
                <img src={LogoHuge} alt="Logo"  className=" cursor-pointer fixed h-100 w-200 object-cover z-30" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}/>
                <img src={LogoDollar} alt="Dollar" className={`fixed z-20 h-200 w-auto transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`} />
            </div>
            <div className="fixed bottom-10 left-0 w-full z-0 bg-white">
              <Carousel slides={slides} />
            </div>
        </div>

    );
}

export default Home;