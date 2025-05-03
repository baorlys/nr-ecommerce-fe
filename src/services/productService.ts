import { products } from '../mock'
import api from './api'
import { ProductFilterParams, ProductRequest } from '../types/product'

// API functions
export const fetchProductsApi = async (params: ProductFilterParams) => {
  try {
    const response = await api.get('/products', { params })
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products'
    throw new Error(errorMessage)
  }
}

export const fetchProductByIdApi = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product by ID'
    throw new Error(errorMessage)
  }
}

export const fetchProductsByCategoryApi = async (categoryId: string) => {
  try {
    // Trong môi trường thực tế, sẽ gọi API
    // const response = await api.get(`/products/category/${categoryId}`);
    // return response.data;

    // Trong môi trường development, sử dụng mock data
    // const filteredProducts = products.filter((p) => p.categorySlug === categoryId)
    const filteredProducts = products

    return filteredProducts
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products'
    throw new Error(errorMessage)
  }
}

export const fetchFeaturedProductsApi = async () => {
  try {
    const response = await api.get('/products?isFeatured=true')
    return response.data
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch featured products'
    throw new Error(errorMessage)
  }
}

// Admin API functions
export const fetchAdminProductsApi = async (params: {
  page: number
  size: number
  filter?: ProductFilterParams | null
}) => {
  try {
    const response = await api.get('/admin/products', {
      params: {
        page: params.page,
        size: params.size,
        ...(params.filter ? params.filter : {}),
      },
    })
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch admin products'
    throw new Error(errorMessage)
  }
}

export const createProductApi = async (product: ProductRequest) => {
  try {
    const response = await api.post('/admin/products', product)
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create product'
    throw new Error(errorMessage)
  }
}

export const updateProductApi = async (id: string, product: ProductRequest) => {
  try {
    const response = await api.post(`/admin/products/${id}`, product)
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update product'
    throw new Error(errorMessage)
  }
}

export const deleteProductApi = async (id: string) => {
  try {
    await api.delete(`/admin/products/${id}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete product'
    throw new Error(errorMessage)
  }
}
