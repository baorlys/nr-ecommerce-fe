import { CategoryRequest } from '../types/category'
import { ApiError } from '../types/common'
import { API_ERROR_MESSAGES } from '../constants/errorMessage'
import api from './api'

// API functions
export const fetchCategoriesApi = async () => {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    const apiError = error.response?.data as ApiError
    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) ||
      'Lấy danh sách danh mục thất bại'
    throw new Error(vietnameseMessage)
  }
}

export const fetchCategoryByIdApi = async (id: string) => {
  try {
    const response = await api.get(`/categories/${id}`)
    return response.data
  } catch (error) {
    const apiError = error.response?.data as ApiError
    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) || 'Lấy danh mục thất bại'
    throw new Error(vietnameseMessage)
  }
}

export const fetchCategoriesFlatApi = async () => {
  try {
    const response = await api.get('admin/categories')
    return response.data
  } catch (error) {
    const apiError = error.response?.data as ApiError
    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) ||
      'Lấy danh sách danh mục thất bại'
    throw new Error(vietnameseMessage)
  }
}

export const createCategoryApi = async (request: CategoryRequest) => {
  try {
    const response = await api.post('admin/categories', request)
    return response.data
  } catch (error) {
    const apiError = error.response?.data as ApiError
    console.log(apiError)

    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) || 'Tạo danh mục thất bại'
    throw new Error(vietnameseMessage)
  }
}

export const updateCategoryApi = async (id: string, request: CategoryRequest) => {
  try {
    const response = await api.put(`admin/categories/${id}`, request)
    return response.data
  } catch (error) {
    const apiError = error.response?.data as ApiError
    console.log(apiError)

    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) || 'Cập nhật danh mục thất bại'
    throw new Error(vietnameseMessage)
  }
}

export const deleteCategoryByIdApi = async (id: string) => {
  try {
    const response = await api.delete(`admin/categories/${id}`)
    return response.data
  } catch (error) {
    const apiError = error.response?.data as ApiError
    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) || 'Xóa danh mục thất bại'
    throw new Error(vietnameseMessage)
  }
}
