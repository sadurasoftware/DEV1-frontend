import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';

import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './pages/Navbar';

import useThemeStore from './store/themeStore';
import { useEffect } from 'react';

const App: React.FC = () => {

  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.body.className = theme; // Apply 'light' or 'dark' theme to body
  }, [theme]);


  return (
    
      <Router>
         <Navbar/>   
         <div>
        <div className="flex justify-end p-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          >
            Toggle Theme
          </button>
        </div>
        <Routes>
          <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
         </div>
      </Router>
  
  );
};


export default App;
