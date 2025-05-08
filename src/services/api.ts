import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

let isRefreshing = false

interface FailedRequest {
  resolve: (value?: unknown) => void
  reject: (reason?: any) => void
}

let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
)

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Check if it's a 401 error and prevent retrying on wrong credentials
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message || ''
      // If the error is due to invalid credentials, don't try to refresh the token
      if (errorMessage === 'Invalid email or password') {
        return Promise.reject(error)
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true
        isRefreshing = true

        try {
          await api.post('/auth/refresh-token')
          processQueue(null)
          return api(originalRequest)
        } catch (refreshError) {
          processQueue(refreshError)
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }

      // If refresh token is being processed, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err))
      }
    }

    return Promise.reject(error)
  },
)

export default api
