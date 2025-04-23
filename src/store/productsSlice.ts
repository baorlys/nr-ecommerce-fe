import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Product, ProductDetail, ProductFilterParams } from '../types/product'
import {
  fetchProductsApi,
  fetchProductByIdApi,
  fetchProductsByCategoryApi,
  fetchFeaturedProductsApi,
} from '../services/productService'

interface ProductsState {
  products: Product[]
  featuredProducts: Product[]
  product: ProductDetail | null
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  featuredProducts: [],
  product: null,
  loading: false,
  error: null,
}

// Thunk actions
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: ProductFilterParams, { rejectWithValue }) => {
    try {
      const response = await fetchProductsApi(params)
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products'
      return rejectWithValue(errorMessage)
    }
  },
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchProductByIdApi(id)
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product by ID'
      return rejectWithValue(errorMessage)
    }
  },
)

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await fetchProductsByCategoryApi(categoryId)
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products'
      return rejectWithValue(errorMessage)
    }
  },
)

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFeaturedProductsApi()
      return response
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch featured products'
      return rejectWithValue(errorMessage)
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
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

      // fetchProductsByCategory
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // fetchFeaturedProducts
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.featuredProducts = action.payload
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default productsSlice.reducer
