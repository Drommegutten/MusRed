import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Medlemmer from './pages/medlemmer/Medlemmer';
import Home from './pages/home/Home';
import Sponsor from './components/sponsor/Sponsor';
import Programmer from "./pages/programmer/Programmer";
import ProgramSide from "./pages/programmer/programSide/ProgramSide";
import { useEffect, useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Forum from './pages/forum/Forum';

const queryClient = new QueryClient()


function AppContent() {

  const [showNav, setShowNavbar] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const showSponsor = 
    location.pathname === "/aktive-og-panger" || 
    location.pathname === "/programmer" || 
    location.pathname.startsWith("/programmer/");
    location.pathname.startsWith("/forum");

  return (
    <div className={`flex flex-col min-h-screen $`}>
      {<Navbar showNav={showNav} />}
      <Routes>
        <Route path="/" element={<Home
                                  onCarouselClick={() => setShowNavbar(true)}
                                  />} 
                                  />
        <Route path="/aktive-og-panger" element={<Medlemmer />} />
        <Route path="/programmer" element={<Programmer/>} />
        <Route path="/programmer/:slug" element={<ProgramSide/>} />
        <Route path="/forum" element={<Forum/>} />
      </Routes>
      {showSponsor && <Sponsor />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;