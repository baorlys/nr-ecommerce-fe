'use client'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa'
import Button from '../components/common/Button'
import { removeFromCart, updateCartItemQuantity, clearCart } from '../store/slice/cartSlice'
import type { RootState } from '../store'
import { formatCurrency } from '../utils/format'

const CartPage = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId))
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateCartItemQuantity({ id: itemId, quantity }))
    }
  }

  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      dispatch(clearCart())
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingFee = subtotal > 500000 ? 0 : 30000
  const total = subtotal + shippingFee

  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="py-16 text-center">
          <div className="mb-4 text-6xl">🛒</div>
          <h2 className="mb-4 text-2xl font-bold">Giỏ hàng của bạn đang trống</h2>
          <p className="mb-8 text-gray-600">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
          <Link to="/san-pham">
            <Button variant="primary" size="lg">
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <h1 className="mb-6 text-2xl font-bold">Giỏ hàng của bạn</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="mb-4 overflow-hidden rounded-lg bg-white shadow-md">
            <div className="hidden bg-gray-100 p-4 font-medium text-gray-600 md:grid md:grid-cols-12">
              <div className="col-span-6">Sản phẩm</div>
              <div className="col-span-2 text-center">Đơn giá</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-2 text-center">Thành tiền</div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="border-t border-gray-200 first:border-t-0">
                <div className="items-center p-4 md:grid md:grid-cols-12">
                  {/* Mobile: Product + Price + Quantity + Subtotal */}
                  <div className="mb-4 flex md:hidden">
                    <div className="mr-4 h-20 w-20 flex-shrink-0">
                      <img
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        className="h-full w-full rounded object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="text-primary mt-1 font-bold">
                        {formatCurrency(item.price)}
                      </div>
                      <div className="mt-2 flex items-center">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="flex h-8 w-8 items-center justify-center rounded-l-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                        >
                          <FaMinus size={12} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(item.id, Number.parseInt(e.target.value) || 1)
                          }
                          className="h-8 w-12 border-y border-gray-300 text-center focus:outline-none"
                        />
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-r-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="font-bold">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Product */}
                  <div className="hidden items-center md:col-span-6 md:flex">
                    <div className="mr-4 h-20 w-20 flex-shrink-0">
                      <img
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        className="h-full w-full rounded object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="mt-1 flex items-center text-sm text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={12} className="mr-1" /> Xóa
                      </button>
                    </div>
                  </div>

                  {/* Desktop: Price */}
                  <div className="hidden text-center font-medium md:col-span-2 md:block">
                    {formatCurrency(item.price)}
                  </div>

                  {/* Desktop: Quantity */}
                  <div className="hidden justify-center md:col-span-2 md:flex">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-l-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                      >
                        <FaMinus size={12} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, Number.parseInt(e.target.value) || 1)
                        }
                        className="h-8 w-12 border-y border-gray-300 text-center focus:outline-none"
                      />
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-r-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop: Subtotal */}
                  <div className="text-primary hidden text-center font-bold md:col-span-2 md:block">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Link to="/san-pham" className="text-primary flex items-center hover:underline">
              <FaArrowLeft className="mr-2" /> Tiếp tục mua sắm
            </Link>
            <Button variant="outline" onClick={handleClearCart}>
              Xóa giỏ hàng
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">Tóm tắt đơn hàng</h2>

            <div className="mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className="font-medium">
                  {shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}
                </span>
              </div>
              {shippingFee > 0 && (
                <div className="text-sm text-gray-500">
                  Miễn phí vận chuyển cho đơn hàng từ {formatCurrency(500000)}
                </div>
              )}
              <div className="mt-3 border-t border-gray-200 pt-3">
                <div className="flex justify-between font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-primary text-xl">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <Link to="/thanh-toan">
              <Button variant="cta" size="lg" fullWidth>
                Tiến hành thanh toán
              </Button>
            </Link>

            <div className="mt-6">
              <h3 className="mb-2 font-medium">Chúng tôi chấp nhận:</h3>
              <div className="flex gap-2">
                <div className="h-8 w-12 rounded bg-gray-200"></div>
                <div className="h-8 w-12 rounded bg-gray-200"></div>
                <div className="h-8 w-12 rounded bg-gray-200"></div>
                <div className="h-8 w-12 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
