// Các kiểu dữ liệu dùng chung
export interface ApiError {
  message: string
  code?: string
  status?: number
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface FormikHelpers<Values> {
  setSubmitting: (isSubmitting: boolean) => void
  setErrors: (errors: { [key: string]: string }) => void
  setStatus: (status: unknown) => void
  setValues: (values: Values) => void
  setFieldValue: (field: string, value: unknown) => void
  setFieldError: (field: string, message: string) => void
  setFieldTouched: (field: string, isTouched: boolean) => void
  validateForm: () => Promise<unknown>
  validateField: (field: string) => Promise<void>
  resetForm: (nextState?: unknown) => void
}
