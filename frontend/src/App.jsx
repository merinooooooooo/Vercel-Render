import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Nav from "./components/Nav/Nav" 
/*import './App.css'*/
import Games from "./pages/games/games"


function App() {


  return (
    
        <Router>
          <Nav />
          <Routes>
           <Route path="/games" element={<Games />} />
          </Routes>
        </Router>
    
  )
}

export default App
