import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LogoMini from "../../assets/LogoMini.png" // your logo import

export default function Navbar({ showNav }: { showNav: boolean }) {
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    if (showNav) {
      setHidden(false)
    } else {  
      setHidden(true)
    }
  }, [showNav])
  console.log("Navbar showNav:", showNav, "hidden:", hidden)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down
        setHidden(true)
      } else {
        // scrolling up
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
        fixed top-0 left-0 w-full h-20 flex items-center justify-center space-x-8 px-4 z-50
        bg-gray-800/90 backdrop-blur shadow-md transition-transform duration-300
        ${hidden ? "-translate-y-24" : "translate-y-0"}
      `}
    >
      <img 
        src={LogoMini} 
        alt="Logo"
        className="h-16 w-16 object-contain cursor-pointer"
        onClick={() => navigate('/')}
      />
      <h1 className="text-white text-lg font-medium cursor-pointer" onClick={() => navigate('/aktive-og-panger')}>Aktive og pang</h1>
      <h1 className="text-white text-lg font-medium cursor-pointer" onClick={() => navigate('/programmer')}>Programmer</h1>
    </div>
  )
}
