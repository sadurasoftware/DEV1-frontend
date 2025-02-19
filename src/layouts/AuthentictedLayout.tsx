import { Navbar } from '@/pages/Navbar'
import { Outlet } from 'react-router-dom'
// import { AuthenticatedLayoutProps } from '../types/LayoutType'
// const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = () => {
const AuthenticatedLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AuthenticatedLayout
