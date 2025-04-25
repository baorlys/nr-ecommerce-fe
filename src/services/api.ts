import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

// Tạo instance axios cho API với withCredentials: true để gửi cookies
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Đảm bảo cookies được gửi với mọi request
})

// Interceptor cho request
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Không cần thêm Authorization header vì JWT token sẽ được gửi tự động qua cookies
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  },
)

// Interceptor cho response
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    const isLoginOrRegisterEndpoint =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register')

    // If 401 and not from login/register, and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry && !isLoginOrRegisterEndpoint) {
      originalRequest._retry = true

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL || '/api'}/auth/refresh-token`,
          {},
          { withCredentials: true },
        )
        return api(originalRequest)
      } catch (refreshError) {
        window.location.href = '/dang-nhap'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
