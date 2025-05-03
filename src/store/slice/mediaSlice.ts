import { uploadMediaApi } from './../../services/mediaService'
import { handleApiError } from '../../utils/apiErrorHandler'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface MediaState {
  media: string[]
  mediaItem: string | null
  loading: boolean
  error: string | null
}

const initialState: MediaState = {
  media: [],
  mediaItem: null,
  loading: false,
  error: null,
}

// Thunk actions
export const uploadMedia = createAsyncThunk(
  'media/uploadMedia',
  async (file: FormData, { rejectWithValue }) => {
    try {
      const response = await uploadMediaApi(file)
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // uploadMedia
      .addCase(uploadMedia.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.loading = false
        state.media.push(action.payload)
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default mediaSlice.reducer
