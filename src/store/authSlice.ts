import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import type { AuthState, LoginRequest, RegisterRequest, User, AuthResponse } from "../../types/user"
import { loginApi, registerApi, logoutApi, getCurrentUserApi } from "../../services/authService"
import { getCookie } from "../../utils/cookies"

// Khởi tạo state từ cookies nếu có
const accessToken = getCookie("accessToken")
const refreshToken = getCookie("refreshToken")

const initialState: AuthState = {
  user: null,
  accessToken: accessToken,
  refreshToken: refreshToken,
  loading: false,
  error: null,
  isAuthenticated: !!accessToken,
}

// Thunk actions
export const login = createAsyncThunk<AuthResponse, LoginRequest, { rejectValue: string }>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginApi(userData)
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đăng nhập thất bại"
      return rejectWithValue(errorMessage)
    }
  },
)

export const register = createAsyncThunk<User, RegisterRequest, { rejectValue: string }>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData)
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đăng ký thất bại"
      return rejectWithValue(errorMessage)
    }
  },
)

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đăng xuất thất bại"
      return rejectWithValue(errorMessage)
    }
  },
)

export const getCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUserApi()
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Lấy thông tin user thất bại"
      return rejectWithValue(errorMessage)
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
    },
    clearCredentials: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.isAuthenticated = true
        toast.success("Đăng nhập thành công!")
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Đăng nhập thất bại"
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.")
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Đăng ký thất bại"
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        state.isAuthenticated = false
        toast.success("Đăng xuất thành công!")
      })

      // getCurrentUser
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Lấy thông tin user thất bại"
        state.isAuthenticated = false
      })
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions

export default authSlice.reducer
