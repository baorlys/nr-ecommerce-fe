import { CategoryFilterParams } from './../../../types/category'
import { CategoryFlat, CategoryRequest } from '../../../types/category'

import { handleApiError } from '../../../utils/apiErrorHandler'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
  fetchCategoriesFlatApi,
  fetchCategoryByIdApi,
  deleteCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
} from '../../../services/categoryService'
import type { PagedResponseSuccess, Pagination } from '../../../types/common'

interface AdminCategoriesState {
  categories: CategoryFlat[]
  category: CategoryRequest | null
  loading: boolean
  error: string | null
  pagination: Pagination | null
}

const initialState: AdminCategoriesState = {
  categories: [],
  category: {} as CategoryRequest,
  loading: false,
  error: null,
  pagination: null,
}

export const fetchCategoriesFlat = createAsyncThunk(
  'admin/categories/fetchCategoriesFlat',
  async (
    params: { page: number; size: number; filter?: CategoryFilterParams | null },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetchCategoriesFlatApi(params)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const fetchCategoryById = createAsyncThunk(
  'admin/categories/fetchCategoryById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchCategoryByIdApi(id)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const deleteCategory = createAsyncThunk(
  'admin/categories/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteCategoryByIdApi(id)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const createCategory = createAsyncThunk(
  'admin/categories/createCategory',
  async (category: CategoryRequest, { rejectWithValue }) => {
    try {
      const response = await createCategoryApi(category)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const updateCategory = createAsyncThunk(
  'admin/categories/updateCategory',
  async ({ id, category }: { id: string; category: CategoryRequest }, { rejectWithValue }) => {
    try {
      const response = await updateCategoryApi(id, category)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

const adminCategoriesSlice = createSlice({
  name: 'admin/categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategoriesFlat.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchCategoriesFlat.fulfilled,
        (state, action: PayloadAction<PagedResponseSuccess<CategoryFlat>>) => {
          state.loading = false
          state.categories = action.payload.data
          state.pagination = action.payload.pagination
        },
      )
      .addCase(fetchCategoriesFlat.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Fetch category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<CategoryRequest>) => {
        state.loading = false
        state.category = action.payload
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.categories = state.categories.filter((category) => category.id !== action.payload)
        toast.warning('Xóa danh mục thành công')
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<CategoryFlat>) => {
        state.loading = false
        state.categories.push(action.payload)
        toast.success('Tạo danh mục thành công')
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<CategoryFlat>) => {
        state.loading = false
        const index = state.categories.findIndex((category) => category.id === action.payload.id)
        if (index !== -1) {
          state.categories[index] = action.payload
        }
        toast.success('Cập nhật danh mục thành công')
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default adminCategoriesSlice.reducer
