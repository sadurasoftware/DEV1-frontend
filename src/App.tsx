import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { useLoginInfoStore } from './store/useLoginInfoStore';

// import  useThemeStore from './store/themeStore';
import { useEffect } from 'react';
import {AuthenticatedLayout} from './layouts/AuthentictedLayout';
import {UnauthenticatedLayout} from './layouts/MainLayout';
import { Navbar } from './pages/Navbar';
import { ForgotPassword } from './pages/Forgetpassword';
import { ResetPassword } from './pages/ResetPassword';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
// import Theme from './pages/Theme';

const App: React.FC = () => {
  // const { theme } = useThemeStore();
  const { token } = useLoginInfoStore(); 
  

  // useEffect(() => {
  //   document.body.className = theme ; 
  // }, [theme]);

  
  return (
    <Router>
      <div>
        <Navbar/>
        {/* <Theme/> */}
        
        {token ? (         
          <AuthenticatedLayout>
            <Routes>
              <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/super-admin' element={<SuperAdminDashboard/>}/>
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </AuthenticatedLayout>
        ) : (
          <UnauthenticatedLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/forget-password" element={<ForgotPassword/>}/>
              <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>} />
              <Route path="/forget-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </UnauthenticatedLayout>
        )}
      </div>
    </Router>
  );
};

export default App;
