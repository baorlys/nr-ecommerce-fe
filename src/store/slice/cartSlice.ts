import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import type { CartItem } from '../../types/cart'

interface CartState {
  cartItems: CartItem[]
}

// Get cart items from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')!)
  : []

const initialState: CartState = {
  cartItems: cartItemsFromStorage,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.id === item.id)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? { ...x, quantity: x.quantity + item.quantity } : x,
        )
        toast.info(`Đã cập nhật số lượng ${item.name} trong giỏ hàng!`)
      } else {
        state.cartItems = [...state.cartItems, item]
        toast.success(`Đã thêm ${item.name} vào giỏ hàng!`)
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      toast.info('Đã xóa sản phẩm khỏi giỏ hàng!')
    },

    updateCartItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload

      state.cartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      )

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    clearCart: (state) => {
      state.cartItems = []
      localStorage.removeItem('cartItems')
      toast.info('Đã xóa tất cả sản phẩm khỏi giỏ hàng!')
    },
  },
})

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
