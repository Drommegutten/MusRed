import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Medlemmer from './pages/medlemmer/Medlemmer';
import Home from './pages/home/Home';
import Sponsor from './components/sponsor/Sponsor';
import Programmer from "./pages/programmer/Programmer";

//import Home from './pages/Home';
//import About from './pages/About';
// //import Lore from './pages/Lore';

function App() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aktive-og-panger" element={<Medlemmer />} />
          <Route path="/programmer" element={<Programmer/>} />
        </Routes>
      </Router>
      {window.location.pathname !== "/*" && <Sponsor />}
    </div>
  );
}

export default App;