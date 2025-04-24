import { categories } from '../mock'
import api from './api'

// API functions
export const fetchCategoriesApi = async () => {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories'
    throw new Error(errorMessage)
  }
}

export const fetchCategoryByIdApi = async (id: string) => {
  try {
    // Trong môi trường thực tế, sẽ gọi API
    // const response = await api.get(`/categories/${id}`);
    // return response.data;

    // Trong môi trường development, sử dụng mock data
    const category = categories.find((c) => c.id === id)

    if (!category) {
      throw new Error('Không tìm thấy danh mục')
    }

    return category
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch category by ID'
    throw new Error(errorMessage)
  }
}
