import { Outlet } from 'react-router'
import '../styles/admin.css'
import SideBar from '../components/admin/SideBar'
import Header from '../components/admin/Header'
import AdminProvider from '../context/AdminProvider'

const Admin = () => {
  return (
    <AdminProvider>
      <div className="font-play flex flex-col h-screen overflow-hidden">
        <Header />

        <div className="flex flex-1 min-h-0">
          <div className="min-w-70 overflow-y-auto 
           [&::-webkit-scrollbar]:w-2
         [&::-webkit-scrollbar-track]:bg-black
         [&::-webkit-scrollbar-thumb]:bg-gray-600 
           customBgColor text-gray-400">
            <SideBar />
          </div>

          <div className="flex-1 min-w-0 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </AdminProvider>
  )
}

export default Admin
