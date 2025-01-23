import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { useLoginInfoStore } from './store/useLoginInfoStore';
import useThemeStore from './store/themeStore';
import { useEffect } from 'react';
import {AuthenticatedLayout} from './layouts/AuthentictedLayout';
import {UnauthenticatedLayout} from './layouts/MainLayout';
import { Navbar } from './pages/Navbar';

const App: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const { token } = useLoginInfoStore(); 

  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  return (
    <Router>
     
      <div>
        <Navbar/>
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
        {token ? (
         
          <AuthenticatedLayout>
            <Routes>
              <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </AuthenticatedLayout>
        ) : (
          <UnauthenticatedLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>} />
            </Routes>
          </UnauthenticatedLayout>
        )}
        
      </div>
    </Router>
  );
};

export default App;
