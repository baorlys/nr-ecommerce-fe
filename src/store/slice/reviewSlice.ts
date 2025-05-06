import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Review, ReviewFilterParams, ReviewRequest } from '../../types/review'
import type { PagedResponseSuccess } from '../../types/common'
import { fetchReviewsApi, createReviewApi, checkEligibilityApi } from '../../services/reviewService'
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
