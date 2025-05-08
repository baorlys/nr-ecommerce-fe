import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

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

import PrivateRoute from './routes/PrivateRoute'
import { getCurrentUser } from './store/slice/authSlice'
import type { AppDispatch, RootState } from './store'
import PublicRoute from './routes/PublicRoute'

function AppRoutes() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector((state: RootState) => state.auth)

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
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:categorySlug" element={<ProductsPage />} />
          <Route path="products/detail/:productSlug" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route path="forbidden" element={<ForbiddenPage />} />

          <Route
            path="profile"
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
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/add" element={<ProductFormPage />} />
          <Route path="products/edit/:productId" element={<ProductFormPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="categories/add" element={<CategoryFormPage />} />
          <Route path="categories/edit/:categoryId" element={<CategoryFormPage />} />
          <Route path="users" element={<AdminUsersPage />} />
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
