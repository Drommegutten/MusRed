import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import LogoMini from "../../assets/LogoMini.png" // your logo import
import "./Navbar.css"

export default function Navbar({ showNav }: { showNav: boolean }) {
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const eleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showNav) {
      setHidden(false)
    } else {  
      setHidden(true)
    }
  }, [showNav])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])
  return (
    <div
      className={`
        fixed top-0 left-0 w-full h-23 flex  items-center px-2 md:px-4 gap-x-2 md:gap-x-6
         transition-transform duration-300 z-10
        ${hidden ? "-translate-y-24" : "translate-y-0"}
      `}
    >
      <img 
        src={LogoMini} 
        alt="Logo"
        className="h-14 w-14 md:h-20 md:w-20 object-contain cursor-pointer"
        onClick={() => navigate('/')}
      />
      <div
       className={"ml-auto flex flex-row items-center justify-end gap-7"}
      > 
      <h1 ref={eleRef} className="navElement text-black lg:text-md md:text-xl font-medium text-center cursor-pointer transition-all duration-300 whitespace-nowrap" onClick={() => navigate('/aktive-og-panger')}>AKTIVE OG PANG</h1>
      <h1 ref={eleRef} className="navElement text-black  lg:text-md md:text-xl font-medium text-center cursor-pointer transition-all duration-300 whitespace-nowrap" onClick={() => navigate('/programmer')}>PROGRAMMER</h1>
       <h1 ref={eleRef} className="navElement text-black  lg:text-md md:text-xl font-medium text-center cursor-pointer transition-all duration-300 whitespace-nowrap" onClick={() => navigate('/forum')}>FORUM</h1> 
      {/* <h1 ref={eleRef} className="navElement text-black col-start-8 text-lg font-medium text-center cursor-pointer transition-all duration-300" onClick={() => navigate('/om-mus-red')}>OM MUS RED</h1> */}
      </div>
    </div>
  )
}
