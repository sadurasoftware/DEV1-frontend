import { useLoginInfoStore } from '@/store/useLoginInfoStore'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function ProtectedAuth() {
  const { token } = useLoginInfoStore()
  const location = useLocation()

  return token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  )
}

export default ProtectedAuth
