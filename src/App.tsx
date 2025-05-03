import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

import MainLayout from './components/layout/MainLayout'
import AdminLayout from './components/layout/AdminLayout'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ForbiddenPage from './pages/ForbiddenPage'
import NotFoundPage from './pages/NotFoundPage'

import DashboardPage from './pages/admin/DashboardPage'
import AdminProductsPage from './pages/admin/ManageProductsPage'
import AdminCategoriesPage from './pages/admin/ManageCategoriesPage'
import AdminUsersPage from './pages/admin/ManageUsersPage'
import ProductFormPage from './pages/admin/ProductFormPage'
import CategoryFormPage from './pages/admin/CategoryFormPage'

import PrivateRoute from './components/common/PrivateRoute'
import { getCurrentUser } from './store/slice/authSlice'
import type { AppDispatch, RootState } from './store'

function AppRoutes() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  useEffect(() => {
    if (user?.role.name === 'ADMIN' && !location.pathname.startsWith('/admin')) {
      navigate('/admin')
    }
  }, [user, navigate, location])

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="san-pham" element={<ProductsPage />} />
          <Route path="san-pham/:categoryId" element={<ProductsPage />} />
          <Route path="san-pham/chi-tiet/:productId" element={<ProductDetailPage />} />
          <Route path="gio-hang" element={<CartPage />} />
          <Route path="thanh-toan" element={<CheckoutPage />} />
          <Route path="dang-nhap" element={<LoginPage />} />
          <Route path="dang-ky" element={<RegisterPage />} />
          <Route path="khong-co-quyen" element={<ForbiddenPage />} />

          <Route
            path="tai-khoan"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="san-pham" element={<AdminProductsPage />} />
          <Route path="san-pham/them-moi" element={<ProductFormPage />} />
          <Route path="san-pham/chinh-sua/:productId" element={<ProductFormPage />} />
          <Route path="danh-muc" element={<AdminCategoriesPage />} />
          <Route path="danh-muc/them-moi" element={<CategoryFormPage />} />
          <Route path="danh-muc/chinh-sua/:categoryId" element={<CategoryFormPage />} />
          <Route path="nguoi-dung" element={<AdminUsersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}
