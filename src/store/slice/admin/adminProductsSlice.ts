import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type {
  AdminProductResponse,
  ProductDetail,
  ProductFilterParams,
  ProductRequest,
} from '../../../types/product'
import type { PagedResponseSuccess, Pagination } from '../../../types/common'
import {
  fetchProductByIdApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  fetchAdminProductsApi,
} from '../../../services/productService'
import { toast } from 'react-toastify'
import { handleApiError } from '../../../utils/apiErrorHandler'

interface AdminProductsState {
  products: AdminProductResponse[]
  product: ProductDetail | null
  loading: boolean
  error: string | null
  pagination: Pagination | null
}

const initialState: AdminProductsState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  pagination: null,
}

// Thunk actions
export const fetchAdminProducts = createAsyncThunk(
  'admin/products/fetchProducts',
  async (
    params: { page: number; size: number; filter?: ProductFilterParams | null },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetchAdminProductsApi(params)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const fetchProductById = createAsyncThunk(
  'admin/products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchProductByIdApi(id)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const createProduct = createAsyncThunk(
  'admin/products/createProduct',
  async (productData: ProductRequest, { rejectWithValue }) => {
    try {
      const response = await createProductApi(productData)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const updateProduct = createAsyncThunk(
  'admin/products/updateProduct',
  async ({ id, productData }: { id: string; productData: ProductRequest }, { rejectWithValue }) => {
    try {
      const response = await updateProductApi(id, productData)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const deleteProduct = createAsyncThunk(
  'admin/products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteProductApi(id)
      return id
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

const adminProductsSlice = createSlice({
  name: 'admin/products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchAdminProducts.fulfilled,
        (state, action: PayloadAction<PagedResponseSuccess<AdminProductResponse>>) => {
          state.loading = false
          state.products = action.payload.data
          state.pagination = action.payload.pagination
        },
      )
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<ProductDetail>) => {
        state.loading = false
        state.product = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<AdminProductResponse>) => {
        state.loading = false
        state.products.push(action.payload)
        toast.success('Thêm sản phẩm thành công!')
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        toast.error('Thêm sản phẩm thất bại!')
      })

      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<AdminProductResponse>) => {
        state.loading = false
        const index = state.products.findIndex((product) => product.id === action.payload.id)
        if (index !== -1) {
          state.products[index] = action.payload
        }
        console.log(action.payload)

        toast.success('Cập nhật sản phẩm thành công!')
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        toast.error('Cập nhật sản phẩm thất bại!')
      })

      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.products = state.products.filter((product) => product.id !== action.payload)
        toast.success('Xóa sản phẩm thành công!')
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        toast.error('Xóa sản phẩm thất bại!')
      })
  },
})

export default adminProductsSlice.reducer
