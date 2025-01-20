import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import { Login } from './components/Login';
import useThemeStore from './store/themeStore';
import { useEffect } from 'react';

const App: React.FC = () => {

  const { theme, toggleTheme, setTheme } = useThemeStore();

  useEffect(() => {
    document.body.className = theme; // Apply 'light' or 'dark' theme to body
  }, [theme]);


  return (
    
      <Router>
         <div>
        <div className="flex justify-end p-4 space-x-4">
          <button
            onClick={() => setTheme('light')}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          >
           Light mode
          </button>
          <button
            onClick={() => setTheme('dark')}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          >
           Dark mode
          </button>
        </div>
        <Routes>
          <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
         </div>
      </Router>
  
  );
};


export default App;
