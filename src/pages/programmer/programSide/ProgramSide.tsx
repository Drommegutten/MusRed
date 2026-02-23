import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { client } from "../../../sanity/lib/client"
import type { Program } from "../../../interfaces/programmer";
import { getProgrammerInfoSlug } from "../../../queries/programSlug";


function ProgramSide() {
    const { slug } = useParams<{ slug: string }>()
    const [programData, setProgramData] = useState<Program | null>(null)

    const [hidden, setHidden] = useState(false)

     useEffect(() => {
        if (!slug) return
        client
            .fetch(getProgrammerInfoSlug(slug))
            .then(setProgramData)
    }, [slug])

    useEffect(() => {
  const handleScroll = () => {
    setHidden(window.scrollY > 300)
  }

  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])

    console.log(programData)

    return (
        <div className="w-screen">
            {!programData ? (
            <p></p>
                    ) : (
                    <div className="flex flex-col w-screen"> 
                        <div
                        className={`sticky top-0 flex justify-center items-center h-[600px] w-screen transition-opacity duration-500 ${
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
                                            <p key={index} className="text-left text-xl">{block.children.map(child => child.text).join('')}</p> 
                                        </div>
                                        ) : 
                                        (<div className="w-120 place-self-end "> 
                                        <p className="text-right  text-xl"> {block.children.map(child => child.text).join('')}</p>
                                        </div>)
                                    }
                                    </div>
                                ))}
                                </div>
                                <div className="w-full h-100% flex flex-col items-center "> 
                                    <h1 className="text-xl ml-4">Aktive medlemmer</h1>
                                    <div className="flex flex-row"> 
                                    {programData.aktiveMedlemmer && programData.aktiveMedlemmer.map((aktivtMedlem, index) => (
                                        <div key={index} className="flex flex-col items-center mb-4 mr-4 ml-4 mt-4"> 
                                            <img className="w-20 h-20 rounded-full mr-4" src={aktivtMedlem.medlemBilde.asset.url} alt={aktivtMedlem.medlemNavn} />
                                            <p className="text-lg">{aktivtMedlem.medlemNavn}</p>
                                        </div>
                                    ))}
                                    </div>

                                    <h1 className="text-xl ml-4">Startet av:</h1>

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
        </div>
    )
};

export default ProgramSide;