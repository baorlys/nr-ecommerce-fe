export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    password?: string // Chỉ sử dụng trong mock data, không nên có trong response API thực tế
    role: "admin" | "customer"
    createdAt?: string
    updatedAt?: string
    phone?: string
    address?: string
    avatar?: string
  }
  
  export interface AuthState {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    loading: boolean
    error: string | null
    isAuthenticated: boolean
  }
  
  export interface LoginRequest {
    email: string
    password: string
    rememberMe?: boolean
  }
  
  export interface RegisterRequest {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword?: string // Chỉ sử dụng ở client, không gửi lên server
  }
  
  export interface AuthResponse {
    user: User
    accessToken: string
    refreshToken: string
  }
  
  export interface RefreshTokenResponse {
    accessToken: string
    refreshToken: string
  }
  