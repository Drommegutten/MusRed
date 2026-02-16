import LogoHuge from "../../assets/LogoHuge.png";

function Home() {
    return (
        <div className="flex flex-col items-center h-[700px]">
        <img src={LogoHuge} alt="Logo" className="h-full w-auto object-contain" />
        </div>
    );

}

export default Home;