import { UserName } from './user'

export interface Review {
  id: string
  user: UserName
  productId: string
  rating: number
  comment: string
  createdOn: string
}

export interface ReviewRequest {
  id?: string | null
  productId: string
  userId: string
  rating: number
  comment: string
}

export interface ReviewFilterParams {
  productId?: string | null
  userId?: string | null
  rating?: number | null
  sortBy?: 'NEWEST' | 'OLDEST'
}
