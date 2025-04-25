import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Button from '../components/common/Button'
import { register } from '../store/authSlice'
import type { AppDispatch } from '../store'

interface RegisterFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('Vui lòng nhập họ'),
  lastName: Yup.string().required('Vui lòng nhập tên'),
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
    .required('Vui lòng xác nhận mật khẩu'),
  agreeTerms: Yup.boolean().oneOf([true], 'Bạn phải đồng ý với điều khoản dịch vụ'),
})

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    setAuthError(null)
    try {
      await dispatch(register(values)).unwrap()
      navigate('/dang-nhap')
    } catch (error) {
      setAuthError(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-custom py-12">
      <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md">
        <div className="p-6">
          <h1 className="mb-6 text-center text-2xl font-bold">Đăng ký tài khoản</h1>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
              agreeTerms: false,
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {authError && (
                  <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">{authError}</div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="mb-1 block font-medium text-gray-700">
                      Họ
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      id="firstName"
                      placeholder="Nhập họ"
                      className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mb-1 block font-medium text-gray-700">
                      Tên
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      id="lastName"
                      placeholder="Nhập tên"
                      className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Nhập email của bạn"
                    className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-1 block font-medium text-gray-700">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Nhập mật khẩu của bạn"
                      className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-1 block font-medium text-gray-700">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      placeholder="Xác nhận mật khẩu"
                      className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Field type="checkbox" name="agreeTerms" id="agreeTerms" className="mt-1" />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                    Tôi đồng ý với{' '}
                    <span className="text-primary cursor-pointer underline">
                      điều khoản dịch vụ
                    </span>
                  </label>
                </div>
                <ErrorMessage name="agreeTerms" component="div" className="text-sm text-red-500" />

                <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Đã có tài khoản?{' '}
                    <Link to="/dang-nhap" className="text-primary font-medium hover:underline">
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
