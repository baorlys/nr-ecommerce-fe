import { JSX } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  children: JSX.Element
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  if (isAuthenticated) {
    // Redirect based on role
    return <Navigate to={user?.role.name === 'ADMIN' ? '/admin' : '/'} replace />
  }

  return children
}
