import { useLoginInfoStore } from '@/store/useLoginInfoStore'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const { token } = useLoginInfoStore()
  const location = useLocation()
  console.log('Redirected from layout....')
  return token ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <>
      <Outlet />
    </>
  )
}

export default Layout
