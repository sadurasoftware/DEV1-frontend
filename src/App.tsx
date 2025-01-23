import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Navbar } from './pages/Navbar';
import { useEffect } from 'react';
import useThemeStore from './store/themeStore';
import { ForgotPassword } from './pages/Forgetpassword';



const App: React.FC = () => {

  const { theme, toggleTheme, setTheme } = useThemeStore();
 

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.className = theme ; 
  }, [theme]);

  
  return (
    <Router>
      <Navbar />
      <div>
        <div className="flex justify-end p-4 space-x-4">
          <button
            onClick={() => handleSetTheme('light')}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          >
            Light mode
          </button>
          <button
            onClick={() => handleSetTheme('dark')}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          >
            Dark mode
          </button>
        </div>
        <Routes>
          <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
