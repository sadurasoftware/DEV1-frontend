import { useLoginInfoStore } from '@/store/useLoginInfoStore'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const { token } = useLoginInfoStore()
  const location = useLocation()
  return token ? (
    <Navigate to="/super-admin" state={{ from: location }} replace />
  ) : (
    <>
      <Outlet />
    </>
  )
}

export default Layout
