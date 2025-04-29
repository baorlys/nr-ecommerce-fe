import { ApiError } from './ApiError'
import { toast } from 'react-toastify'

/**
 * Xử lý lỗi API và hiển thị thông báo phù hợp
 * @param error Lỗi cần xử lý
 * @param defaultMessage Thông báo mặc định nếu không thể xác định lỗi
 * @returns ApiError đã được chuẩn hóa
 */
export const handleApiError = (error: unknown): ApiError => {
  const apiError = ApiError.fromError(error)

  // Hiển thị thông báo lỗi
  showErrorNotification(apiError)

  return apiError
}

/**
 * Hiển thị thông báo lỗi dựa trên loại lỗi
 * @param error Lỗi API cần hiển thị
 */
export const showErrorNotification = (error: ApiError): void => {
  // Xử lý các loại lỗi khác nhau
  switch (error.status) {
    case 401:
      // Lỗi xác thực - có thể chuyển hướng đến trang đăng nhập
      toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
      break

    case 403:
      // Lỗi quyền truy cập
      toast.error('Bạn không có quyền thực hiện hành động này.')
      break

    case 404:
      // Lỗi không tìm thấy
      toast.error(error.message || 'Không tìm thấy tài nguyên yêu cầu.')
      break

    case 422:
      // Lỗi validation
      toast.error(error.message || 'Dữ liệu không hợp lệ.')
      break

    case 500:
    default:
      // Lỗi server hoặc lỗi không xác định
      toast.error(error.message || 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.')
      break
  }
}

/**
 * Trích xuất thông báo lỗi từ đối tượng lỗi
 * @param error Lỗi cần trích xuất thông báo
 * @returns Thông báo lỗi
 */
export const getErrorMessage = (error: unknown): string => {
  const apiError = ApiError.fromError(error)
  return apiError.message
}
