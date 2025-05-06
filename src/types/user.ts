export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  phone?: string
  createdOn: string
  updatedOn: string
}

export interface Role {
  id: string
  name: string
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

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

export interface UserName {
  firstName: string
  lastName: string
}

export interface UpdateUserInfoRequest {
  firstName?: string
  lastName?: string
  phone?: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
