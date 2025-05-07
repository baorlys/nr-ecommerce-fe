import { CategoryFlat } from './category'

export enum ProductUnit {
  KG = 'kg',
  G = 'g',
  L = 'l',
  ML = 'ml',
}

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  imageUrl: string
}

export interface ProductDetail {
  id: string
  name: string
  shortDescription: string
  description: string
  category: CategoryFlat
  images: ProductImage[]
  variants: ProductVariant[]
  averageRating: number
  totalReviews: number
  isFeatured: boolean
}

export interface ProductVariant {
  id: string | null
  name: string
  price: number
  stockQuantity: number
}

export interface ProductImage {
  id: string | null
  imageUrl: string
  altText: string
  isPrimary: boolean
  sortOrder: number
}

export interface ProductFilterParams {
  search?: string | null
  categoryId?: string | null
  categorySlug?: string | null
  minPrice?: number | null
  maxPrice?: number | null
  rating?: number | null
  sortBy?: 'NEWEST' | 'PRICE_ASC' | 'PRICE_DESC'
}

export interface AdminProductResponse {
  id: string
  name: string
  slug: string
  imageUrl: string
  categoryId: string
  categoryName: string
  isFeatured: boolean
  numberOfVariants: number
  averageRating: number
  totalReviews: number
  createdOn: string
  updatedOn: string
}

export interface ProductRequest {
  name: string
  shortDescription: string
  description: string
  categoryId: string
  images: ProductImage[]
  variants: ProductVariant[]
}
