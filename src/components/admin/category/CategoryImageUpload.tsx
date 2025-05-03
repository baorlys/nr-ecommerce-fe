'use client'

import type React from 'react'

import { ErrorMessage } from 'formik'
import { FaImage, FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { uploadMedia } from '../../../store/slice/mediaSlice'
import { toast } from 'react-toastify'
import type { AppDispatch } from '../../../store'

interface CategoryImageUploadProps {
  imageUrl: string
  uploadingImage: boolean
  setUploadingImage: (uploading: boolean) => void
  setFieldValue: (field: string, value: any) => void
}

const CategoryImageUpload = ({
  imageUrl,
  uploadingImage,
  setUploadingImage,
  setFieldValue,
}: CategoryImageUploadProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadingImage(false)
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setUploadingImage(true)
      const file = event.currentTarget.files[0]
      const formData = new FormData()
      formData.append('file', file)
      try {
        const response: any = await dispatch(uploadMedia(formData)).unwrap()
        setFieldValue('imageUrl', response)
        toast.success('Tải lên hình ảnh thành công')
      } catch (error) {
        console.error('Error uploading image:', error)
        toast.error('Lỗi khi tải ảnh lên. Vui lòng thử lại.')
      } finally {
        setUploadingImage(false)
      }
    }
  }

  const removeImage = () => {
    setFieldValue('imageUrl', '')
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Hình ảnh danh mục <span className="text-red-500">*</span>
      </label>
      <div className="mb-4">
        {imageUrl ? (
          <div className="group relative">
            <img
              src={imageUrl || '/placeholder.svg'}
              alt="Category"
              className="h-48 w-full rounded-md border border-gray-300 object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <FaTimes size={12} />
            </button>
          </div>
        ) : (
          <div className="hover:text-primary hover:border-primary flex h-48 flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-500 transition-colors">
            <label htmlFor="image-upload" className="flex cursor-pointer flex-col items-center p-4">
              <FaImage size={24} className="mb-2" />
              <span className="text-sm">Tải lên hình ảnh</span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploadingImage}
              />
            </label>
          </div>
        )}
        <ErrorMessage name="imageUrl" component="div" className="mt-1 text-sm text-red-600" />
      </div>
      {uploadingImage && <p className="text-sm text-gray-500">Đang tải ảnh lên...</p>}
    </div>
  )
}

export default CategoryImageUpload
