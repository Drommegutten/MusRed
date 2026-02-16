import LogoMini from "../../assets/LogoMini.png";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-20 bg-gray-800 flex items-center justify-center fixed top-0 left-0 z-50 space-x-8 px-4">
      <img 
        src={LogoMini} 
        alt="Logo"
        className="h-16 w-16 object-contain"
        onClick={() => navigate('/')}
      />
      <h1 className="text-white text-lg font-medium cursor-pointer" onClick={() => navigate('/aktive-og-panger')}>Aktive og pang</h1>
      <h1 className="text-white text-lg font-medium cursor-pointer" onClick={() => navigate('/ommusred')}>Om Musred</h1>
      <h1 className="text-white text-lg font-medium cursor-pointer" onClick={() => navigate('/lore')}>Lore</h1>
      <h1 className="text-white text-lg font-medium cursor-pointer" onClick={() => navigate('/programmer')}>Programmer</h1>
    </div>
  );
}

export default Navbar;
