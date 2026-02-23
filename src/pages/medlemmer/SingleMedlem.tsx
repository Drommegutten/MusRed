import type { Medlem } from "../../interfaces/medlemmer";
import slimeFunk from "../../assets/FUNK.png";
import PANG from "../../assets/PANG.png";
import { Navigate, useNavigate } from "react-router-dom";


type Props = {
  medlem: Medlem
  index: number
  opptakDekom: string
  varPang: boolean;
}

function getSemester(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const semester = month >= 7 ? "Høst" : "Vår"

  return `${semester} ${year}`
}

function SingleMedlem({medlem, index}: Props) {

    const opptakDekom = getSemester(medlem.tattOpp);
    const forlotDekom = getSemester(medlem.forlot);
    const navigate = useNavigate();

    return (
    <div key={index} className="mb-4 p-4 border rounded-lg bg-white">

            <h1 className="text-3xl font-semibold text-center"> {medlem.medlemNavn}</h1>

            <div className= "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"> 
              <div className="align-middle flex flex-col items-center justify-center relative shadow"> 
                <div className="object-top max-h-100">
                
                  {medlem.varFunk ? 
                  (
                    <div> 
                        
                        <img src={medlem.medlemBilde.asset.url} alt={medlem.medlemNavn} className="max-h-70 w-100 object-cover"/>
                        <div className="h-33 w-100 z-10 overflow-hidden bottom-3 relative">
                            <img src={slimeFunk} alt="Slime Funk" className="object-cover object-top h-33 w-100 "/>
                        </div>
                    </div>
                  ) : 
                  <div>
                    <img src={medlem.medlemBilde.asset.url} alt={medlem.medlemNavn} className="h-70 w-100 mb-6 object-cover"/>
                  </div>
                  }
                </div>

                <div className="flex flex-row"> 
                  <h2 className="mr-10 text-2xl">{opptakDekom} </h2>
                  <h2 className="text-2xl">{forlotDekom} </h2>
                </div>

              </div>

              <div className="flex flex-col col-span-2 ">
                  <img 
                    src={medlem.programTilhorighet.bilde.asset.url} 
                    alt={medlem.programTilhorighet.programNavn} 
                    className="w-100% max-h-100 object-cover"
                    onClick={() => navigate(`/programmer/${medlem.programTilhorighet.slug.current}`)}
                  />
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
    )
}

export default SingleMedlem;