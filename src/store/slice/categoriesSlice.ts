import { Category } from './../../types/category'
import { handleApiError } from './../../utils/apiErrorHandler'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { fetchCategoriesApi } from '../../services/categoryService'
interface CategoriesState {
  categories: Category[]
  category: Category | null
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  category: {} as Category,
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
      return rejectWithValue(handleApiError(error))
    }
  },
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all categories
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
