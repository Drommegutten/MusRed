import { useEffect, useRef, useState } from "react";
import type { Medlem } from "../../interfaces/medlemmer";
import slimeFunk from "../../assets/FUNK.png";
import { useNavigate } from "react-router-dom";
import imageUrlBuilder from '@sanity/image-url';
import { client } from "../../sanity/lib/client"


const builder = imageUrlBuilder(client);

type Props = {  
  medlem: Medlem
  index: number
}

function getSemester(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 

  const semester = month >= 7 ? "HØST" : "VÅR"

  return `${semester} ${year}`
}

function SingleMedlem({medlem}: Props) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [forlotDekom, setForlotDekom] = useState("")
    const [opptakDekom, setOpptakDekom] = useState("")

    function urlFor(source: string): ReturnType<typeof builder.image> {
      return builder.image(source);
    }
    console.log(medlem)

    useEffect(() => {
      const element = cardRef.current;

      if (!element) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
          else {
            setIsVisible(false);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      setOpptakDekom(getSemester(medlem.tattOpp));
      setForlotDekom(medlem.forlot === null ? "AKTIV" : getSemester(medlem.forlot));
    }, [medlem.tattOpp, medlem.forlot])

    const navigate = useNavigate();

    return (
    <div
      ref={cardRef}
      className={`mb-4 p-4 border h-auto bg-white transition-all duration-600 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0"
      }`}
      style={{ transitionDelay: `${40}ms` }}
    >
            <h1 className="text-3xl font-semibold text-center"> {medlem.medlemNavn}</h1>

            <div className= "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"> 
              <div className="align-middle flex flex-col items-center justify-center relative"> 
                <div> 
                  {medlem.varFunk ? (
                    <div className="flex flex-col items-center justify-center h-80"> 
                      <img 
                        src={urlFor(medlem.medlemBilde.asset.url)
                              .width(320)          // adjust width as needed
                              .height(200)         // adjust height as needed
                              .auto('format')
                              .url()} 
                        alt={medlem.medlemNavn} 
                        className="max-h-50 w-80 object-cover object-center" 
                      />

                      <div className="h-33 w-full z-10 overflow-hidden bottom-3 relative">
                        <img 
                          src={slimeFunk} 
                          alt="Slime Funk" 
                          className="object-cover object-top h-37 w-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-80">
                      <img 
                        src={urlFor(medlem.medlemBilde.asset.url)
                              .width(320)
                              .height(280)
                              .auto('format')
                              .url()} 
                        alt={medlem.medlemNavn} 
                        className="max-h-70 w-80 object-cover object-center"
                      />
                    </div>
                  )}
                  </div>

                <div className="flex flex-row"> 
                  <h2 className="mr-10 text-2xl">{opptakDekom} </h2>
                  <h2 className="text-2xl mb-3">{forlotDekom} </h2>
                </div>
              </div>


              <div className="flex flex-col col-span-2 ">
                  <img 
                    src={medlem.programTilhorighet.bilde.asset.url} 
              
                    alt={medlem.programTilhorighet.programNavn} 
                    className="w-100% max-h-70 object-contain cursor-pointer"
                    onClick={() => navigate(`/programmer/${medlem.programTilhorighet.slug.current}`)}
                  />
                  {medlem.tattOppAv?.medlemNavn && (
                                                      <div className="flex flex-row items-center mb-5 mr-5 justify-end">
                                                        
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
    )
}

export default SingleMedlem;