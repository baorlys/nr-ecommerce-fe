import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Review, ReviewFilterParams, ReviewRequest } from '../../types/review'
import type { PagedResponseSuccess } from '../../types/common'
import {
  fetchReviewsApi,
  createReviewApi,
  checkEligibilityApi,
  updateReviewApi,
  deleteReviewApi,
} from '../../services/reviewService'
import { handleApiError } from '../../utils/apiErrorHandler'
import { ApiError } from '../../utils/ApiError'
import { Pagination } from '../../types/common'
import { toast } from 'react-toastify'

interface ReviewsState {
  reviews: Review[]
  loading: boolean
  error: ApiError | null
  pagination: Pagination | null
  canReview: boolean
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
  pagination: null,
  canReview: false,
}

// Thunk actions
export const fetchReviews = createAsyncThunk<
  PagedResponseSuccess<Review>,
  { page?: number; size?: number; filter?: ReviewFilterParams | null },
  { rejectValue: ApiError }
>('reviews/fetchReviews', async (params, { rejectWithValue }) => {
  try {
    const response = await fetchReviewsApi(params)
    return response.data
  } catch (error) {
    return rejectWithValue(handleApiError(error))
  }
})

export const createReview = createAsyncThunk<Review, ReviewRequest, { rejectValue: ApiError }>(
  'reviews/createReview',
  async (request, { rejectWithValue }) => {
    try {
      const response = await createReviewApi(request)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const updateReview = createAsyncThunk<
  Review,
  { id: string; request: ReviewRequest },
  { rejectValue: ApiError }
>('reviews/updateReview', async ({ id, request }, { rejectWithValue }) => {
  try {
    const response = await updateReviewApi(id, request)
    return response.data
  } catch (error) {
    return rejectWithValue(handleApiError(error))
  }
})

export const deleteReview = createAsyncThunk<void, string, { rejectValue: ApiError }>(
  'reviews/deleteReview',
  async (id, { rejectWithValue }) => {
    try {
      await deleteReviewApi(id)
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const checkEligibility = createAsyncThunk<boolean, { userId: string; productId: string }>(
  'reviews/checkEligibility',
  async (params, { rejectWithValue }) => {
    try {
      const response = await checkEligibilityApi(params)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<PagedResponseSuccess<Review>>) => {
          state.loading = false
          state.reviews = action.payload.data
          state.pagination = action.payload.pagination
        },
      )
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ApiError
      })

      // create review
      .addCase(createReview.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.loading = false
        state.reviews.push(action.payload)
        toast.success('Đánh giá sản phẩm thành công')
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ApiError
      })

      // update review
      .addCase(updateReview.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.loading = false
        const index = state.reviews.findIndex((review) => review.id === action.payload.id)
        if (index !== -1) {
          state.reviews[index] = action.payload
        }
        toast.success('Cập nhật đánh giá thành công')
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ApiError
      })

      // delete review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false
        const index = state.reviews.findIndex((review) => review.id === action.meta.arg)
        if (index !== -1) {
          state.reviews.splice(index, 1)
        }
        toast.success('Xóa đánh giá thành công')
      })

      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ApiError
      })

      // check eligibility
      .addCase(checkEligibility.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkEligibility.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.loading = false
        state.canReview = action.payload
      })
      .addCase(checkEligibility.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ApiError
      })
  },
})

export default reviewsSlice.reducer
