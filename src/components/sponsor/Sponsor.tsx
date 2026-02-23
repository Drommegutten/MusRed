import BackInBlack from "../../assets/sponsorBilder/BackInBlack.png";
import Dahls from "../../assets/sponsorBilder/Dahls.png";
import fernet from "../../assets/sponsorBilder/fernet.png";
import RaysBar from "../../assets/sponsorBilder/RaysBar.png";

function Sponsor() {
    return (
        <div className="w-full h-full flex-row items-center justify-center bottom-0 left-0 z-50 space-x-8 px-4 mt-20 background-gray-800/90 backdrop-blur shadow-md">
            <h1 className="text-center">Stolte sponsorer av musikkredaksjonen:</h1>
            <div className="flex flex-col items-center justify-center mt-4">
            <div className="flex gap-8">
                <img src={BackInBlack} alt="BackInBlack" className="h-36 w-auto object-contain" />
                <img src={Dahls} alt="Dahls" className="h-36 w-auto object-contain" />
            </div>
            <div className="flex gap-8 mt-4">
                <img src={fernet} alt="Fernet" className="h-36 w-auto object-contain" />
                <img src={RaysBar} alt="RaysBar" className="h-36 w-auto object-contain" />
            </div>
            </div>
        </div>
    );
}

export default Sponsor;