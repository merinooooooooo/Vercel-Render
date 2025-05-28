import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Nav from "./components/Nav/Nav" 
/*import './App.css'*/
import Games from "./pages/games/games"
import Clients from './pages/clients/clients';



function App() {


  return (
    
        <Router>
          <Nav />
          <Routes>
           <Route path="/games" element={<Games />} />
       
           <Route path="/" element={<Games />} />
           <Route path="/clients" element={<Clients />} />
        
           <Route path="/gameCard" element={<CardGame />} />
          </Routes>
        </Router>
    
  )
}

export default App
