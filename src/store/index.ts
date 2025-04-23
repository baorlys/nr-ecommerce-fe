import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../store/productsSlice'
import categoriesReducer from '../store/categoriesSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
