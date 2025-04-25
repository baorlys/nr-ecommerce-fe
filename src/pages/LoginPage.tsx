'use client'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa'
import Button from '../components/common/Button'
import { login } from '../store/authSlice'
import type { AppDispatch } from '../store'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
  rememberMe: Yup.boolean(),
})

interface LoginFormValues {
  email: string
  password: string
}

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    setAuthError(null)
    try {
      await dispatch(login(values)).unwrap()
      navigate('/')
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
          <h1 className="mb-6 text-center text-2xl font-bold">Đăng nhập</h1>

          <Formik
            initialValues={{
              email: '',
              password: '',
              rememberMe: false,
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {authError && (
                  <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">{authError}</div>
                )}
                <div>
                  <label htmlFor="email" className="mb-1 block font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                    placeholder="Nhập email của bạn"
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
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                      placeholder="Nhập mật khẩu của bạn"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link to="/quen-mat-khau" className="text-primary hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Chưa có tài khoản?{' '}
                    <Link to="/dang-ky" className="text-primary font-medium hover:underline">
                      Đăng ký ngay
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Hoặc đăng nhập với</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <FaGoogle className="mr-2 h-5 w-5 text-red-500" />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <FaFacebook className="mr-2 h-5 w-5 text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
