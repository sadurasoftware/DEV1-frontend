import './App.css';
import RegisterForm from './components/RegisterForm';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './pages/Navbar';
const App: React.FC = () => {
  return (
    
      <Router>
         <Navbar/>    
        <Routes>
          <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/register" element={<RegisterForm />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
  );
};
export default App;
