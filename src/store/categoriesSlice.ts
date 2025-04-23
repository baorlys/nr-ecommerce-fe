import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Category } from '../types/category'
import { fetchCategoriesApi } from '../services/categoryService'

interface CategoriesState {
  categories: Category[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
}

// Thunk actions
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCategoriesApi()
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories'
      return rejectWithValue(errorMessage)
    }
  },
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default categoriesSlice.reducer
