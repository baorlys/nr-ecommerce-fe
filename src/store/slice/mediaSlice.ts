import { deleteMediaApi, uploadMediaApi } from './../../services/mediaService'
import { handleApiError } from '../../utils/apiErrorHandler'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

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

export const deleteMedia = createAsyncThunk(
  'media/deleteMedia',
  async (imgUrl: string, { rejectWithValue }) => {
    try {
      await deleteMediaApi(imgUrl)
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
        toast.success('Tải lên hình ảnh thành công')
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        toast.error('Lỗi khi tải ảnh lên. Vui lòng thử lại.')
      })

      // deleteMedia
      .addCase(deleteMedia.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.loading = false
        state.media = state.media.filter((item) => item !== action.meta.arg)
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default mediaSlice.reducer
