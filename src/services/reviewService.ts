import api from './api'
import { ReviewRequest, ReviewFilterParams } from '../types/review'

// API functions
export const fetchReviewsApi = async (params: {
  page?: number
  size?: number
  filter?: ReviewFilterParams | null
}) => {
  try {
    const response = await api.get('/reviews', {
      params: {
        page: params.page,
        size: params.size,
        ...(params.filter ? params.filter : {}),
      },
    })
    return response
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch reviews'
    throw new Error(errorMessage)
  }
}

export const createReviewApi = async (review: ReviewRequest) => {
  try {
    const response = await api.post('/reviews', review)
    return response
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create review'
    throw new Error(errorMessage)
  }
}

export const updateReviewApi = async (reviewId: string, review: ReviewRequest) => {
  try {
    const response = await api.put(`/reviews/${reviewId}`, review)
    return response
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update review'
    throw new Error(errorMessage)
  }
}

export const deleteReviewApi = async (reviewId: string) => {
  try {
    const response = await api.delete(`/reviews/${reviewId}`)
    return response
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete review'
    throw new Error(errorMessage)
  }
}

export const checkEligibilityApi = async (params: { userId: string; productId: string }) => {
  try {
    const response = await api.get(`/reviews/eligibility`, {
      params: {
        userId: params.userId,
        productId: params.productId,
      },
    })
    return response
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to check eligibility'
    throw new Error(errorMessage)
  }
}
