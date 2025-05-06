import type { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import type { RootState } from '../store'

interface PrivateRouteProps {
  children: ReactNode
  requiredRole?: 'ADMIN' | 'USER'
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useSelector((state: RootState) => state.auth)
  const location = useLocation()
  const role = user?.role.name

  // Nếu đang loading, hiển thị loading indicator
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Đang tải...</div>
  }

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />
  }

  // Nếu yêu cầu role cụ thể và user không có role đó
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/khong-co-quyen" replace />
  }

  // Nếu đã đăng nhập và có quyền truy cập, hiển thị nội dung
  return <>{children}</>
}

export default PrivateRoute
