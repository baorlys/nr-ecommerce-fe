import api from './api'
import { ApiError } from '../types/common'
import { API_ERROR_MESSAGES } from '../constants/errorMessage'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenResponse,
  User,
} from '../types/user'

export const loginApi = async (userData: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/login', userData)
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại'
    throw new Error(errorMessage)
  }
}

export const registerApi = async (userData: RegisterRequest): Promise<User> => {
  try {
    const response = await api.post('/auth/register', userData)
    return response.data
  } catch (error) {
    const apiError = error.response?.data as ApiError
    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) || 'Đăng ký thất bại'

    throw new Error(vietnameseMessage)
  }
}

export const logoutApi = async (): Promise<void> => {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Đăng xuất thất bại'
    throw new Error(errorMessage)
  }
}

export const refreshAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  try {
    // Trong môi trường thực tế, sẽ gọi API
    const response = await api.post('/auth/refresh-token', { refreshToken })
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Refresh token thất bại'
    throw new Error(errorMessage)
  }
}

export const getCurrentUserApi = async (): Promise<User> => {
  try {
    const response = await api.get('/auth/me')
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Lấy thông tin user thất bại'
    throw new Error(errorMessage)
  }
}
