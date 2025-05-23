import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slice/productsSlice'
import categoriesReducer from './slice/categoriesSlice'
import adminCategoriesReducer from './slice/admin/adminCategoriesSlice'
import adminProductsReducer from './slice/admin/adminProductsSlice'
import adminUsersReducer from './slice/admin/adminUsersSlice'
import authReducer from './slice/authSlice'
import cartReducer from './slice/cartSlice'
import reviewsSlice from './slice/reviewSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    reviews: reviewsSlice,
    adminCategories: adminCategoriesReducer,
    adminProducts: adminProductsReducer,
    adminUsers: adminUsersReducer,
    auth: authReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
