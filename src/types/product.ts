import { PaginationParams } from './common'
export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  categoryId: string
  categoryName: string
  categorySlug: string
  rating: number
  reviewCount: number
  isFeatured: boolean
  isInStock: boolean
  weight: number
  origin: string
  shortDescription: string
  description: string
  ingredients?: string[]
  usage?: string
  storage?: string
  reviews?: ProductReview[]
}

export interface ProductReview {
  id: string
  name: string
  rating: number
  date: string
  comment: string
}

export interface ProductFilterParams extends PaginationParams {
  search?: string
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'rating'
}
