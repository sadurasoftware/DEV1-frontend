import ErrorBoundary from '@/components/ErrorBoundary'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import AuthentictedLayout from './layouts/AuthentictedLayout'
import Layout from './layouts/Layout'
import ProtectedAuth from './layouts/ProtectedAuth'
import { AdminDashboard } from './pages/AdminDashboard'
import Admins from './pages/Admins'
import Category from './pages/Category'
import CreateTicket from './pages/CreateTicket'
import Departments from './pages/Departments'
import { EditAdminProfile } from './pages/EditAdminProfile'
import { EditForm } from './pages/EditForm'
import { EditUserProfile } from './pages/EditUserProfile'
import { ForgotPassword } from './pages/Forgetpassword'
import Landing from './pages/Landing'
import { Login } from './pages/Login'
import Modules from './pages/Modules'
import Permissionpage from './pages/Permissionpage'
import RegisterForm from './pages/RegisterForm'
import { ResetPassword } from './pages/ResetPassword'
import RolePage from './pages/Rolepage'
import { Settings } from './pages/Settings'
import { SuperAdminDashboard } from './pages/SuperAdminDashboard'
import SuperAdminPermission from './pages/SuperAdminPermission'
import { UserDashboard } from './pages/UserDashboard'
import Users from './pages/Users'
import {TicketsListPage} from './pages/TicketsListPage'
import { AssignTicket } from './pages/AssignTicket'
import { ViewTicket } from './pages/ViewTicket'


// import Theme from './pages/Theme';
// import  useThemeStore from './store/themeStore';
// import { useEffect } from 'react';

const App: React.FC = () => {
  // const { theme } = useThemeStore();
  // const { token } = useLoginInfoStore()

  // useEffect(() => {
  //   document.body.className = theme ;
  // }, [theme]);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route
              path="/"
              element={<Landing />}
              // element={<h1 className="flex justify-center">Dev Frontend</h1>}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedAuth />}>
            <Route path="/" element={<AuthentictedLayout />}>
              <Route
                path="/"
                element={<h1 className="flex justify-center">Dev Frontend</h1>}
              />
              <Route path="/super-admin" element={<SuperAdminDashboard />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route
                path="/edit-profile/:userId"
                element={<EditUserProfile />}
              />
              <Route path="/create-ticket" element={<CreateTicket />} />
              <Route path='/assign-ticket/:id' element={<AssignTicket/>}/>
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route
                path="/edit-admin-profile/:userId"
                element={<EditAdminProfile />}
              />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/users" element={<Users />} />
              <Route path="/admins" element={<Admins />} />
              <Route path="/settings" element={<Settings />} />
              <Route
                path="/super-admin-permissions"
                element={<SuperAdminPermission />}
              />
              <Route path="/roles" element={<RolePage />} />
              <Route path="/permissions" element={<Permissionpage />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/edit/:id" element={<EditForm />} />
              <Route path="/modules" element={<Modules />} />
              <Route path="/category" element={<Category />} />
              <Route path="/tickets" element={<TicketsListPage/>}/>
              <Route path="/view-ticket/:id" element={<ViewTicket/>}/>
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
      {/* <Theme/> */}
    </Router>
  )
}

export default App
