import { PaginationParams } from './common'
export interface Product {
  id: string
  name: string
  slug: string
  price: number
  image: string
}

export interface ProductDetail {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  categoryId: string
  categoryName: string
  categorySlug: string
  rating: number
  reviewCount: number
  isFeatured: boolean
  isInStock: boolean
  shortDescription: string
  description: string
  reviews?: ProductReview[]
  variants: ProductVariant[]
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  weight: number
  unit: string
  isInStock: boolean
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
