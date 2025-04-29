import { handleApiError } from './../../utils/apiErrorHandler'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import type { AuthState, LoginRequest, RegisterRequest, User } from '../../types/user'
import { loginApi, registerApi, logoutApi, getCurrentUserApi } from '../../services/authService'

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}

// Thunk actions
export const login = createAsyncThunk<User, LoginRequest, { rejectValue: string }>(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginApi(userData)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error).message)
    }
  },
)

export const register = createAsyncThunk<User, RegisterRequest, { rejectValue: string }>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error).message)
    }
  },
)

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi()
    } catch (error) {
      return rejectWithValue(handleApiError(error).message)
    }
  },
)

export const getCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUserApi()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearCredentials: (state) => {
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
        state.user = action.payload
        state.isAuthenticated = true
        toast.success('Đăng nhập thành công!')
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Đăng nhập thất bại'
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false
        toast.success('Đăng ký thành công! Vui lòng đăng nhập.')
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Đăng ký thất bại'
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        toast.success('Đăng xuất thành công!')
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
        state.error = action.payload || 'Lấy thông tin user thất bại'
        state.isAuthenticated = false
      })
  },
})

export const { clearCredentials } = authSlice.actions

export default authSlice.reducer
