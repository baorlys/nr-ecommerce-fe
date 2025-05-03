import api from './api'
import { ApiError } from '../types/common'
import { API_ERROR_MESSAGES } from '../constants/errorMessage'

import type { UpdateUserRoleRequest } from '../types/user'

export const getAllUsersApi = async (params: { page: number; size: number }) => {
  try {
    const response = await api.get('admin/users', {
      params: {
        page: params.page,
        size: params.size,
      },
    })
    return response.data
  } catch (error) {
    const apiError = error.response?.data as ApiError
    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) ||
      'Lấy danh sách người dùng thất bại'

    throw new Error(vietnameseMessage)
  }
}

export const deleteUserApi = async (userId: string) => {
  try {
    const response = await api.delete(`admin/users/${userId}`)
    return response.data
  } catch (error) {
    const apiError = error.response?.data as ApiError
    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) || 'Xóa người dùng thất bại'

    throw new Error(vietnameseMessage)
  }
}
