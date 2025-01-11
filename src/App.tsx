import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from './components/Login';

function App() {
  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
