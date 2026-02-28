import BackInBlack from "../../assets/sponsorBilder/backInBlack.png";
import Dahls from "../../assets/sponsorBilder/dahls.png";
import fernet from "../../assets/sponsorBilder/fernet.png";
import RaysBar from "../../assets/sponsorBilder/raysBar.png";
import samfLogo from "../../assets/samfLogo.png";

function Sponsor() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full flex-row items-center justify-center bottom-0 left-0 z-50 space-x-8 px-4 mt-20 shadow bg-gray-400 backdrop-blur-sm ">
            <div className="flex flex-col ml-4 items-center align-center shadow-xl ">
                <h1 className="text-lg text-center mb-4">
                    Denne nettsiden er direkte tilknyttet Studentersamfundet i Trondheim
                </h1>
                <img src={samfLogo} alt="SamfLogo" onClick={() => window.open("https://www.samfundet.no/arrangement/4341-styresuppe", "_blank")} className="h-30 mb-5 cursor-pointer w-auto object-contain" />
            </div>

            <div className="my-5">
                <h1 className="text-center mt-5 ">Stolte sponsorer av musikkredaksjonen:</h1>
                <div className="flex flex-col items-center justify-center mt-4 shadow-xl">
                <div className="flex gap-5">
                    <img src={BackInBlack} alt="BackInBlack" className="h-30 w-auto object-contain " />
                    <img src={Dahls} alt="Dahls" className="h-30 w-auto object-contain" />
                </div>
                <div className="flex gap-5 mt-4 mb-5">
                    <img src={fernet} alt="Fernet" className="h-30 w-auto object-contain" />
                    <img src={RaysBar} alt="RaysBar" className="h-30 w-auto object-contain" />
                </div>
                </div>
            </div>

            <div className="ml-4 mt-20 shadow-xl" >
                <h1 className="text-4xl text-center">
                    Nettside 
                    laget av 
                    Mats Aarsland Fosdahl 
                </h1>
            
            </div>
        </div>
    );
}

export default Sponsor;