import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { client } from "../../../sanity/lib/client"
import type { Program } from "../../../interfaces/programmer";
import { getProgrammerInfoSlug } from "../../../queries/programSlug";
import { getProgrammerInfo } from "../../../sanity/queries/sanityFetching";
import Carousel from "../../../components/carousel/Carousel";
import "./programSide.css"
import RRLogo from "../../../assets/RR_logo.png"


function ProgramSide() {
    const { slug } = useParams<{ slug: string }>()
    const [programData, setProgramData] = useState<Program | null>(null)
    const [programmerData, setProgrammerData] = useState<Program[]>([]);

    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        if (!slug) return
        client
            .fetch(getProgrammerInfoSlug(slug))
            .then(setProgramData)
    }, [slug])

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
        slug: program.slug.current
      }));
    
    


    useEffect(() => {
        const handleScroll = () => {
            setHidden(window.scrollY > 300)
        }

    window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    return (
        <div className="w-screen">
            {!programData ? (
            <p></p>
                    ) : (
                    <div className="flex flex-col w-screen "> 
                        <div
                        className={`sticky top-23 flex justify-center mt-23 items-center h-[600px] w-screen transition-opacity duration-500 ${
                            hidden ? "opacity-30" : "opacity-100"
                        }`}
                        >
                        <img
                            className="h-full w-auto"
                            src={programData.bilde.asset.url}
                            alt={programData.programNavn}
                        />
                    </div >
                    
                    <div className="z-1 flex flex-row" >
                            <div className="ml-14"> 
                                {programData.beskrivelse.map((block, index) => (
                                    <div className="w-160 mb-10 mr-10" key={index}> 
                                    {index % 2 === 0 ? 
                                        ( <div className="w-120"> 
                                            <p key={index} className="text-left text-lg">{block.children.map(child => child.text).join('')}</p> 
                                        </div>
                                        ) : 
                                        (<div className="w-120 place-self-end "> 
                                        <p className="text-right  text-lg"> {block.children.map(child => child.text).join('')}</p>
                                        </div>)
                                    }
                                    
                                    </div>
                                ))}
                                <img className="w-30 h-30 cursor-pointer" src={RRLogo} alt="RR Logo" onClick={() => window.open(programData.linkTil, '_blank')} />
                                </div>
                                <div className="w-full h-100% flex flex-col items-center "> 
                                    <h1 className="text-xl ml-4">AKTIVE MEDLEMMER</h1>
                                    <div className="grid grid-cols-2 items-center justify-items-center"> 
                                    {programData.aktiveMedlemmer && programData.aktiveMedlemmer.map((aktivtMedlem, index, arr) => {
                                        const isLastOdd = arr.length % 2 === 1 && index === arr.length - 1;
                                        return (
                                        <div
                                            key={index}
                                            className={`flex flex-col items-center mb-4 mr-4 ml-4 mt-4 ${isLastOdd ? "col-span-2 justify-self-center" : ""}`}
                                        > 
                                            <img className="w-40 h-40 rounded-full mr-4" src={aktivtMedlem.medlemBilde.asset.url} alt={aktivtMedlem.medlemNavn} />
                                            <p className="text-lg text-center">{aktivtMedlem.medlemNavn}</p>
                                        </div>
                                        )
                                    })}
                                    </div>

                                    <h1 className="text-xl ml-4">GRUNNLAGT AV:</h1>

                                    {programData.startaAv && programData.startaAv.map((starter, index) => (
                                        <div key={index} className="flex flex-col items-center mb-4 mr-4 ml-4 mt-4"> 
                                            <img className="w-30 h-30 rounded-full" src={starter.medlemBilde.asset.url} alt={starter.medlemNavn} />
                                            <p className="text-lg">{starter.medlemNavn}</p>
                                        </div>
                                    ))}
                                </div>

                        </div>
                    </div>
            )}
        <Carousel slides={slides}/>

        </div>
    )
};

export default ProgramSide;