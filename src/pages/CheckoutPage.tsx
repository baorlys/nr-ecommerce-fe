'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Button from '../components/common/Button'
import type { RootState, AppDispatch } from '../store'
import { clearCart } from '../store/slice/cartSlice'
// import { createOrder } from '../store/slice/orderSlice'
import { formatCurrency } from '../utils/format'

const CheckoutSchema = Yup.object().shape({
  fullName: Yup.string().required('Vui lòng nhập họ tên'),
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
  address: Yup.string().required('Vui lòng nhập địa chỉ'),
  city: Yup.string().required('Vui lòng chọn tỉnh/thành phố'),
  district: Yup.string().required('Vui lòng chọn quận/huyện'),
  ward: Yup.string().required('Vui lòng chọn phường/xã'),
  paymentMethod: Yup.string().required('Vui lòng chọn phương thức thanh toán'),
  notes: Yup.string(),
})

const CheckoutPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state: RootState) => state.cart)
  const { user } = useSelector((state: RootState) => state.auth)

  const [shippingMethod, setShippingMethod] = useState('standard')

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingFee = shippingMethod === 'express' ? 50000 : subtotal > 500000 ? 0 : 30000
  const total = subtotal + shippingFee

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      // const orderData = {
      //   ...values,
      //   items: cartItems,
      //   subtotal,
      //   shippingFee,
      //   total,
      //   shippingMethod,
      // }

      // await dispatch(createOrder(orderData)).unwrap()
      dispatch(clearCart())
      navigate('/dat-hang-thanh-cong')
    } catch (error: any) {
      setErrors({ submit: error.message || 'Đặt hàng thất bại. Vui lòng thử lại.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    navigate('/gio-hang')
    return null
  }

  return (
    <div className="container-custom py-8">
      <h1 className="mb-6 text-2xl font-bold">Thanh toán</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-2/3">
          <Formik
            initialValues={{
              fullName:
                user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
              email: user?.email || '',
              phone: user?.phone || '',
              address: '',
              city: '',
              district: '',
              ward: '',
              paymentMethod: 'cod',
              notes: '',
            }}
            validationSchema={CheckoutSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                {errors.submit && (
                  <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
                    {errors.submit}
                  </div>
                )}

                <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
                  <h2 className="mb-4 text-xl font-bold">Thông tin giao hàng</h2>

                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="mb-1 block font-medium text-gray-700">
                        Họ tên
                      </label>
                      <Field
                        type="text"
                        name="fullName"
                        id="fullName"
                        className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                        placeholder="Nhập họ tên"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-1 block font-medium text-gray-700">
                        Số điện thoại
                      </label>
                      <Field
                        type="tel"
                        name="phone"
                        id="phone"
                        className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                        placeholder="Nhập số điện thoại"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="mb-1 block font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                      placeholder="Nhập email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="address" className="mb-1 block font-medium text-gray-700">
                      Địa chỉ
                    </label>
                    <Field
                      type="text"
                      name="address"
                      id="address"
                      className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                      placeholder="Nhập địa chỉ"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label htmlFor="city" className="mb-1 block font-medium text-gray-700">
                        Tỉnh/Thành phố
                      </label>
                      <Field
                        as="select"
                        name="city"
                        id="city"
                        className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                      >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        <option value="hanoi">Hà Nội</option>
                        <option value="hochiminh">TP. Hồ Chí Minh</option>
                        <option value="danang">Đà Nẵng</option>
                      </Field>
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="district" className="mb-1 block font-medium text-gray-700">
                        Quận/Huyện
                      </label>
                      <Field
                        as="select"
                        name="district"
                        id="district"
                        className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                      >
                        <option value="">Chọn Quận/Huyện</option>
                        <option value="district1">Quận 1</option>
                        <option value="district2">Quận 2</option>
                        <option value="district3">Quận 3</option>
                      </Field>
                      <ErrorMessage
                        name="district"
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="ward" className="mb-1 block font-medium text-gray-700">
                        Phường/Xã
                      </label>
                      <Field
                        as="select"
                        name="ward"
                        id="ward"
                        className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                      >
                        <option value="">Chọn Phường/Xã</option>
                        <option value="ward1">Phường 1</option>
                        <option value="ward2">Phường 2</option>
                        <option value="ward3">Phường 3</option>
                      </Field>
                      <ErrorMessage
                        name="ward"
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
                  <h2 className="mb-4 text-xl font-bold">Phương thức vận chuyển</h2>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="shipping-standard"
                        name="shippingMethod"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                      />
                      <label htmlFor="shipping-standard" className="ml-3 block">
                        <span className="font-medium">Giao hàng tiêu chuẩn</span>
                        <span className="block text-sm text-gray-500">2-3 ngày làm việc</span>
                      </label>
                      <span className="ml-auto font-medium">
                        {subtotal > 500000 ? 'Miễn phí' : formatCurrency(30000)}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="shipping-express"
                        name="shippingMethod"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                      />
                      <label htmlFor="shipping-express" className="ml-3 block">
                        <span className="font-medium">Giao hàng nhanh</span>
                        <span className="block text-sm text-gray-500">1-2 ngày làm việc</span>
                      </label>
                      <span className="ml-auto font-medium">{formatCurrency(50000)}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
                  <h2 className="mb-4 text-xl font-bold">Phương thức thanh toán</h2>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Field
                        type="radio"
                        name="paymentMethod"
                        id="payment-cod"
                        value="cod"
                        className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                      />
                      <label htmlFor="payment-cod" className="ml-3 block">
                        <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Field
                        type="radio"
                        name="paymentMethod"
                        id="payment-bank"
                        value="bank"
                        className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                      />
                      <label htmlFor="payment-bank" className="ml-3 block">
                        <span className="font-medium">Chuyển khoản ngân hàng</span>
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Field
                        type="radio"
                        name="paymentMethod"
                        id="payment-momo"
                        value="momo"
                        className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                      />
                      <label htmlFor="payment-momo" className="ml-3 block">
                        <span className="font-medium">Ví MoMo</span>
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Field
                        type="radio"
                        name="paymentMethod"
                        id="payment-vnpay"
                        value="vnpay"
                        className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                      />
                      <label htmlFor="payment-vnpay" className="ml-3 block">
                        <span className="font-medium">VNPay</span>
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    name="paymentMethod"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
                  <h2 className="mb-4 text-xl font-bold">Ghi chú đơn hàng</h2>

                  <Field
                    as="textarea"
                    name="notes"
                    id="notes"
                    rows={3}
                    className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                  />
                </div>

                <div className="lg:hidden">
                  <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-bold">Đơn hàng của bạn</h2>

                    <div className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between py-3">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-600"> x {item.quantity}</span>
                          </div>
                          <div className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="mb-2 flex justify-between">
                        <span className="text-gray-600">Tạm tính</span>
                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="mb-2 flex justify-between">
                        <span className="text-gray-600">Phí vận chuyển</span>
                        <span className="font-medium">
                          {shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-lg font-bold">
                        <span>Tổng cộng</span>
                        <span className="text-primary">{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" variant="cta" size="lg" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="hidden lg:block lg:w-1/3">
          <div className="sticky top-20 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">Đơn hàng của bạn</h2>

            <div className="mb-4 max-h-[400px] divide-y divide-gray-200 overflow-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-3">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600"> x {item.quantity}</span>
                  </div>
                  <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className="font-medium">
                  {shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-lg font-bold">
                <span>Tổng cộng</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              fullWidth
              className="mt-6"
              form="checkout-form"
            >
              Đặt hàng
            </Button>

            <div className="mt-6 text-sm text-gray-500">
              <p>
                Bằng cách đặt hàng, bạn đồng ý với các{' '}
                <a href="/dieu-khoan" className="text-primary hover:underline">
                  Điều khoản dịch vụ
                </a>{' '}
                và{' '}
                <a href="/chinh-sach" className="text-primary hover:underline">
                  Chính sách bảo mật
                </a>{' '}
                của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
