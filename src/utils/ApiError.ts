export class ApiError extends Error {
  public readonly timestamp: string
  public readonly status: number
  public readonly path: string
  public readonly originalError?: unknown

  constructor({
    message,
    status = 500,
    timestamp = new Date().toISOString(),
    path = '',
    originalError,
  }: {
    message: string
    status?: number
    timestamp?: string
    path?: string
    originalError?: unknown
  }) {
    super(message)
    this.status = status
    this.timestamp = timestamp
    this.path = path
    this.originalError = originalError

    // Đặt tên cho lớp lỗi
    this.name = this.constructor.name
  }

  /**
   * Tạo lỗi Bad Request (400)
   */
  static badRequest(message: string, path = '') {
    return new ApiError({
      message,
      status: 400,
      path,
    })
  }

  /**
   * Tạo lỗi Unauthorized (401)
   */
  static unauthorized(message = 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn', path = '') {
    return new ApiError({
      message,
      status: 401,
      path,
    })
  }

  /**
   * Tạo lỗi Forbidden (403)
   */
  static forbidden(message = 'Bạn không có quyền thực hiện hành động này', path = '') {
    return new ApiError({
      message,
      status: 403,
      path,
    })
  }

  /**
   * Tạo lỗi Not Found (404)
   */
  static notFound(message = 'Không tìm thấy tài nguyên yêu cầu', path = '') {
    return new ApiError({
      message,
      status: 404,
      path,
    })
  }

  /**
   * Tạo lỗi Validation (422)
   */
  static validation(message = 'Dữ liệu không hợp lệ', path = '') {
    return new ApiError({
      message,
      status: 422,
      path,
    })
  }

  /**
   * Tạo lỗi Server (500)
   */
  static server(message = 'Đã xảy ra lỗi máy chủ', path = '') {
    return new ApiError({
      message,
      status: 500,
      path,
    })
  }

  /**
   * Tạo lỗi từ lỗi gốc (có thể là từ Axios hoặc các nguồn khác)
   */
  static fromError(error: unknown): ApiError {
    // Nếu đã là ApiError, trả về nguyên bản
    if (error instanceof ApiError) {
      return error
    }

    // Xử lý lỗi Axios
    if (error && typeof error === 'object' && 'isAxiosError' in error && error.isAxiosError) {
      const axiosError = error as any
      const response = axiosError.response

      if (response && response.data) {
        const errorData = response.data

        // Kiểm tra xem response có phù hợp với cấu trúc ErrorResponse không
        if (
          errorData.timestamp &&
          typeof errorData.status === 'number' &&
          typeof errorData.message === 'string' &&
          typeof errorData.path === 'string'
        ) {
          return new ApiError({
            message: errorData.message,
            status: errorData.status,
            timestamp: errorData.timestamp,
            path: errorData.path,
            originalError: error,
          })
        }
      }

      // Nếu không phù hợp với cấu trúc ErrorResponse, tạo ApiError từ thông tin cơ bản
      const status = axiosError.response?.status || 500
      const message =
        axiosError.response?.data?.message || axiosError.message || 'Lỗi kết nối đến máy chủ'
      const path = axiosError.config?.url || ''

      return new ApiError({
        message,
        status,
        path,
        originalError: error,
      })
    }

    // Xử lý lỗi chuẩn JavaScript
    if (error instanceof Error) {
      return new ApiError({
        message: error.message,
        status: 500,
        path: '',
        originalError: error,
      })
    }

    // Xử lý các loại lỗi khác
    return new ApiError({
      message: String(error) || 'Đã xảy ra lỗi không xác định',
      status: 500,
      path: '',
      originalError: error,
    })
  }

  /**
   * Chuyển đổi lỗi thành đối tượng JSON
   */
  toJSON() {
    return {
      timestamp: this.timestamp,
      status: this.status,
      message: this.message,
      path: this.path,
    }
  }
}
