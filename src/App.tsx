import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { useLoginInfoStore } from './store/useLoginInfoStore';
import {AuthenticatedLayout} from './layouts/AuthentictedLayout';
import {UnauthenticatedLayout} from './layouts/MainLayout';
import { Navbar } from './pages/Navbar';
import { ForgotPassword } from './pages/Forgetpassword';
import { ResetPassword } from './pages/ResetPassword';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import SuperAdminPermission from './pages/SuperAdminPermission';
import { Settings } from './pages/Settings';
import RolePage from './pages/Rolepage';
import Admins from './pages/Admins';
import Users from './pages/Users';
import { UserDashboard } from './pages/UserDashboard';
import { EditUserProfile } from './pages/EditUserProfile';
import { AdminDashboard } from './pages/AdminDashboard';
import { EditForm } from './pages/editForm';

// import Theme from './pages/Theme';
// import  useThemeStore from './store/themeStore';
// import { useEffect } from 'react';

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
              <Route path='/userdashboard' element={<UserDashboard/>}/>
              <Route path="/edit-profile/:userId" element={<EditUserProfile />} />
              <Route path='/admindashboard' element={<AdminDashboard/>}/>
              <Route path="/register" element={<RegisterForm />} />
              <Route path='/users' element={<Users/>}/>
              <Route path="/admins" element={<Admins />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/super-admin-permissions" element={<SuperAdminPermission />} />
              <Route path="/rolepage" element={<RolePage />} />
              <Route path="/edit/:id" element={<EditForm />} />
              
            </Routes>
          </AuthenticatedLayout>
        ) : (
          <UnauthenticatedLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/forget-password" element={<ForgotPassword/>}/>
              <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>} />
              <Route path="/reset-password" element={<ResetPassword />} />             
            </Routes>
          </UnauthenticatedLayout>
        )}
      </div>
    </Router>
  );
};

export default App;
