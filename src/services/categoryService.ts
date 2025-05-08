import { CategoryFilterParams, CategoryRequest } from '../types/category'
import api from './api'

// API functions
export const fetchCategoriesApi = async () => {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch admin products'
    throw new Error(errorMessage)
  }
}

export const fetchCategoryByIdApi = async (id: string) => {
  try {
    const response = await api.get(`/categories/${id}`)
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch admin products'
    throw new Error(errorMessage)
  }
}

export const fetchCategoriesFlatApi = async (params: {
  page: number
  size: number
  filter?: CategoryFilterParams | null
}) => {
  try {
    const response = await api.get('admin/categories', {
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

export const createCategoryApi = async (request: CategoryRequest) => {
  try {
    const response = await api.post('admin/categories', request)
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch admin products'
    throw new Error(errorMessage)
  }
}

export const updateCategoryApi = async (id: string, request: CategoryRequest) => {
  try {
    const response = await api.put(`admin/categories/${id}`, request)
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch admin products'
    throw new Error(errorMessage)
  }
}

export const deleteCategoryByIdApi = async (id: string) => {
  try {
    const response = await api.delete(`admin/categories/${id}`)
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch admin products'
    throw new Error(errorMessage)
  }
}
