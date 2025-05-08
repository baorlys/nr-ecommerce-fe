'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaCamera } from 'react-icons/fa'
import Button from '../components/common/Button'
import type { RootState, AppDispatch } from '../store'
import { changePassword, getCurrentUser, updateUserInfo } from '../store/slice/authSlice'

interface ProfileFormValues {
  firstName: string
  lastName: string
  phone: string
}

interface PasswordFormValues {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Validation schema for profile information
const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('Vui lòng nhập họ'),
  lastName: Yup.string().required('Vui lòng nhập tên'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
})

// Validation schema for password
const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
  newPassword: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu mới'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp')
    .required('Vui lòng xác nhận mật khẩu'),
})

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState('profile')

  if (!user) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">Vui lòng đăng nhập để xem thông tin tài khoản.</div>
      </div>
    )
  }

  const handleUpdateProfile = async (
    values: ProfileFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      await dispatch(updateUserInfo(values)).unwrap()
      await dispatch(getCurrentUser()).unwrap()
    } catch (error) {
      console.error('Update profile error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChangePassword = async (
    values: PasswordFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    try {
      await dispatch(changePassword(values)).unwrap()
      resetForm()
    } catch (error) {
      console.error('Change password error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  // Define initial values with explicit type
  const profileInitialValues: ProfileFormValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phone: user.phone || '',
  }

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="sticky top-20 rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6 flex flex-col items-center">
              <div className="relative">
                <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                  <div className="bg-primary flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </div>
                </div>
                <button className="bg-primary absolute right-0 bottom-0 rounded-full p-2 text-white shadow-md">
                  <FaCamera size={14} />
                </button>
              </div>
              <h2 className="mt-2 text-xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            <nav>
              <button
                className={`mb-2 flex w-full items-center rounded-md px-4 py-3 text-left ${
                  activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUser className="mr-3" /> Thông tin cá nhân
              </button>
              <button
                className={`mb-2 flex w-full items-center rounded-md px-4 py-3 text-left ${
                  activeTab === 'password' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('password')}
              >
                <FaLock className="mr-3" /> Đổi mật khẩu
              </button>
              <button
                className={`mb-2 flex w-full items-center rounded-md px-4 py-3 text-left ${
                  activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <FaMapMarkerAlt className="mr-3" /> Đơn hàng của tôi
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-3/4">
          <div className="rounded-lg bg-white p-6 shadow-md">
            {activeTab === 'profile' && (
              <div>
                <h2 className="mb-6 text-2xl font-bold">Thông tin cá nhân</h2>

                <Formik<ProfileFormValues>
                  initialValues={profileInitialValues}
                  validationSchema={ProfileSchema}
                  onSubmit={handleUpdateProfile}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="mb-1 block font-medium text-gray-700"
                          >
                            Họ
                          </label>
                          <div className="relative">
                            <Field
                              type="text"
                              name="firstName"
                              id="firstName"
                              className="focus:ring-primary w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
                              placeholder="Nhập họ"
                            />
                            <div className="absolute top-0 left-0 flex h-full items-center pl-3 text-gray-500">
                              <FaUser />
                            </div>
                          </div>
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="lastName"
                            className="mb-1 block font-medium text-gray-700"
                          >
                            Tên
                          </label>
                          <div className="relative">
                            <Field
                              type="text"
                              name="lastName"
                              id="lastName"
                              className="focus:ring-primary w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
                              placeholder="Nhập tên"
                            />
                            <div className="absolute top-0 left-0 flex h-full items-center pl-3 text-gray-500">
                              <FaUser />
                            </div>
                          </div>
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="email" className="mb-1 block font-medium text-gray-700">
                          Email
                        </label>
                        <div className="relative">
                          <Field
                            type="email"
                            name="email"
                            className="w-full rounded-md border border-gray-300 bg-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
                            placeholder={user.email}
                            disabled
                          />
                          <div className="absolute top-0 left-0 flex h-full items-center pl-3 text-gray-500">
                            <FaEnvelope />
                          </div>
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div className="mb-6">
                        <label htmlFor="phone" className="mb-1 block font-medium text-gray-700">
                          Số điện thoại
                        </label>
                        <div className="relative">
                          <Field
                            type="text"
                            name="phone"
                            id="phone"
                            className="focus:ring-primary w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
                            placeholder="Nhập số điện thoại"
                          />
                          <div className="absolute top-0 left-0 flex h-full items-center pl-3 text-gray-500">
                            <FaPhone />
                          </div>
                        </div>
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            {activeTab === 'password' && (
              <div>
                <h2 className="mb-6 text-2xl font-bold">Đổi mật khẩu</h2>

                <Formik<PasswordFormValues>
                  initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  }}
                  validationSchema={PasswordSchema}
                  onSubmit={handleChangePassword}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-6">
                        <label
                          htmlFor="currentPassword"
                          className="mb-1 block font-medium text-gray-700"
                        >
                          Mật khẩu hiện tại
                        </label>
                        <Field
                          type="password"
                          name="currentPassword"
                          id="currentPassword"
                          className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                          placeholder="Nhập mật khẩu hiện tại"
                        />
                        <ErrorMessage
                          name="currentPassword"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="newPassword"
                          className="mb-1 block font-medium text-gray-700"
                        >
                          Mật khẩu mới
                        </label>
                        <Field
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                          placeholder="Nhập mật khẩu mới"
                        />
                        <ErrorMessage
                          name="newPassword"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="confirmPassword"
                          className="mb-1 block font-medium text-gray-700"
                        >
                          Xác nhận mật khẩu mới
                        </label>
                        <Field
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                          placeholder="Xác nhận mật khẩu mới"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="mb-6 text-2xl font-bold">Đơn hàng của tôi</h2>
                <p className="text-gray-600">
                  Chức năng này đang được phát triển. Vui lòng quay lại sau.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
