import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { useLoginInfoStore } from './store/useLoginInfoStore';
import useThemeStore from './store/themeStore';
import React, { useEffect } from 'react';
import { AuthenticatedLayout } from './layouts/AuthentictedLayout';
import { UnauthenticatedLayout } from './layouts/MainLayout';

const App: React.FC = () => {
 
  const { theme, setTheme } = useThemeStore();
  const { token } = useLoginInfoStore(); 

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<UnauthenticatedLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>

        {token && (
          <Route path="/dashboard" element={<AuthenticatedLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        )}
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;
