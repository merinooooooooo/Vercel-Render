import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Nav from "./components/Nav/Nav" 
/*import './App.css'*/
import Games from "./pages/games/games"
import Clients from './pages/clients/clients';
import CardGame from './pages/gameCard/gameCard';


function App() {


  return (
    
        <Router>
          <Nav />
          <Routes>
           <Route path="/games" element={<Games />} />
          </Routes>
          <Routes>
           <Route path="/clients" element={<Clients />} />
          </Routes>
          <Routes>
           <Route path="/gameCard" element={<CardGame />} />
          </Routes>
        </Router>
    
  )
}

export default App
