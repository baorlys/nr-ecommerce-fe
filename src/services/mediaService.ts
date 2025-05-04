import api from './api'
import { ApiError } from '../types/common'
import { API_ERROR_MESSAGES } from '../constants/errorMessage'

export const uploadMediaApi = async (file: FormData): Promise<string> => {
  try {
    const response = await api.post('/media/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    const apiError = error.response?.data as ApiError
    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) || 'Tải lên tệp thất bại'

    throw new Error(vietnameseMessage)
  }
}

export const deleteMediaApi = async (imgUrl: string) => {
  try {
    await api.delete(`/media`, { params: { imgUrl } })
  } catch (error) {
    const apiError = error.response?.data as ApiError
    const vietnameseMessage =
      (apiError?.message && API_ERROR_MESSAGES[apiError.message]) || 'Xóa tệp thất bại'

    throw new Error(vietnameseMessage)
  }
}
