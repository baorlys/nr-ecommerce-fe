'use client'

import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  FaTachometerAlt,
  FaBoxes,
  FaListUl,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
} from 'react-icons/fa'
import Logo from '../common/Logo'
import { logout } from '../../store/slice/authSlice'
import type { AppDispatch } from '../../store'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/dang-nhap')
  }

  const menuItems = [
    { path: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/admin/san-pham', icon: <FaBoxes />, label: 'Sản phẩm' },
    { path: '/admin/danh-muc', icon: <FaListUl />, label: 'Danh mục' },
    { path: '/admin/don-hang', icon: <FaShoppingCart />, label: 'Đơn hàng' },
    { path: '/admin/nguoi-dung', icon: <FaUsers />, label: 'Người dùng' },
    { path: '/admin/cai-dat', icon: <FaCog />, label: 'Cài đặt' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside
        className={`bg-primary fixed inset-y-0 left-0 z-50 transform text-white ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 flex-col transition duration-200 ease-in-out md:relative md:flex md:translate-x-0 ${
          mobileMenuOpen ? 'flex' : 'hidden'
        }`}
      >
        <div className="border-primary-dark flex items-center justify-between border-b p-3">
          <Link to="/admin" className="flex items-center">
            <Logo variant="light" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white focus:outline-none md:hidden"
            aria-label="Close menu"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center rounded-md px-4 py-3 text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-dark text-white'
                    : 'hover:bg-primary-dark text-white/80 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-primary-dark border-t p-4">
          <button
            onClick={handleLogout}
            className="hover:bg-primary-dark flex w-full items-center rounded-md px-4 py-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <FaSignOutAlt className="mr-3" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={() => {
                  setSidebarOpen(!sidebarOpen)
                  setMobileMenuOpen(false)
                }}
                className="hidden text-gray-500 focus:outline-none md:block"
                aria-label="Toggle sidebar"
              >
                <FaBars size={20} />
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-gray-500 focus:outline-none md:hidden"
                aria-label="Open menu"
              >
                <FaBars size={20} />
              </button>
              <h1 className="ml-4 text-lg font-semibold text-gray-800">
                {menuItems.find((item) => item.path === location.pathname)?.label || 'Admin'}
              </h1>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                    <FaUser />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
