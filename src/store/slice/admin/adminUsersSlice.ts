import { deleteUserApi, getAllUsersApi } from '../../../services/userService'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../../types/user'
import { Pagination } from '../../../types/common'
import { PagedResponseSuccess } from '../../../types/common'
import { toast } from 'react-toastify'

interface AdminUsersState {
  users: User[]
  loading: boolean
  error: string | null
  pagination: Pagination | null
}

const initialState: AdminUsersState = {
  users: [],
  loading: false,
  error: null,
  pagination: null,
}

// Thunk actions
export const fetchUsers = createAsyncThunk(
  'admin/users/fetchUsers',
  async (
    params: { page: number; size: number },
    { rejectWithValue }: { rejectWithValue: (value: string) => void },
  ) => {
    try {
      const response = await getAllUsersApi(params)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const deleteUser = createAsyncThunk(
  'admin/users/deleteUser',
  async (userId: string, { rejectWithValue }: { rejectWithValue: (value: string) => void }) => {
    try {
      const response = await deleteUserApi(userId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<PagedResponseSuccess<User>>) => {
        state.loading = false
        state.users = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        const userId = action.meta.arg
        state.users = state.users.filter((user) => user.id !== userId)
        toast.warn('Xóa người dùng thành công')
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default adminUsersSlice.reducer
