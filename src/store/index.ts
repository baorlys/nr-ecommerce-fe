import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slice/productsSlice'
import categoriesReducer from './slice/categoriesSlice'
import adminCategoriesReducer from './slice/admin/adminCategoriesSlice'
import authReducer from './slice/authSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    adminCategories: adminCategoriesReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
