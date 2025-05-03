'use client'

import type React from 'react'
import { FaImage } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { uploadMedia } from '../../../store/slice/mediaSlice'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../store'
import type { ProductImage } from '../../../types/product'
import SortableImage from './SortableImage'

// Import dnd-kit components
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

interface ProductImagesProps {
  images: ProductImage[]
  uploadingImages: boolean
  setUploadingImages: (uploading: boolean) => void
  setFieldValue: (field: string, value: any) => void
}

const ProductImages = ({
  images = [],
  uploadingImages,
  setUploadingImages,
  setFieldValue,
}: ProductImagesProps) => {
  const dispatch = useDispatch<AppDispatch>()

  // Ensure images is always an array
  const imageArray = Array.isArray(images) ? images : []

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadingImages(true)
    const uploadedImages: ProductImage[] = []

    try {
      // Create a copy of the current images array to work with
      const currentImages = [...imageArray]

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file)

        // Use await to ensure each upload completes before proceeding
        const response = await dispatch(uploadMedia(formData)).unwrap()

        // Create a new ProductImage object
        const newImage: ProductImage = {
          id: null,
          imageUrl: response,
          altText: file.name.split('.')[0] || 'Product image',
          isPrimary: currentImages.length === 0 && uploadedImages.length === 0 && i === 0, // First image is primary if no images exist
          sortOrder: currentImages.length + uploadedImages.length,
        }

        uploadedImages.push(newImage)
      }

      // Update form values with new images
      setFieldValue('images', [...imageArray, ...uploadedImages])

      // Reset the file input to allow selecting the same files again
      event.target.value = ''

      toast.success('Tải lên hình ảnh thành công')
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Lỗi khi tải ảnh lên. Vui lòng thử lại.')
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    // Create a deep copy of the images array to avoid modifying the original objects
    const newImages = imageArray.map((img) => ({ ...img }))

    // If removing the primary image, set the next image as primary
    if (newImages[index].isPrimary && newImages.length > 1) {
      const nextIndex = index === newImages.length - 1 ? 0 : index + 1
      newImages[nextIndex] = { ...newImages[nextIndex], isPrimary: true }
    }

    newImages.splice(index, 1)

    // Update sort order for remaining images - create new objects with updated sortOrder
    const updatedImages = newImages.map((img, idx) => ({
      ...img,
      sortOrder: idx,
    }))

    setFieldValue('images', updatedImages)
  }

  const setPrimaryImage = (index: number) => {
    const newImages = imageArray.map((img, idx) => ({
      ...img,
      isPrimary: idx === index,
    }))

    setFieldValue('images', newImages)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const activeIndex = Number.parseInt(active.id.toString().split('-')[1])
    const overIndex = Number.parseInt(over.id.toString().split('-')[1])

    // Use arrayMove to reorder the array
    const reorderedImages = arrayMove(imageArray, activeIndex, overIndex)

    // Create new objects with updated sortOrder - don't modify the original objects
    const updatedImages = reorderedImages.map((item, index) => ({
      ...item,
      sortOrder: index,
    }))

    setFieldValue('images', updatedImages)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Hình ảnh sản phẩm</h3>
        <div className="text-sm text-gray-500">
          <span className="font-medium">Lưu ý:</span> Kéo thả để sắp xếp thứ tự hình ảnh
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={imageArray.map((_, index) => `image-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {imageArray.map((image, index) => (
              <SortableImage
                key={`image-${index}`}
                image={image}
                index={index}
                removeImage={() => removeImage(index)}
                setPrimaryImage={() => setPrimaryImage(index)}
              />
            ))}

            <div className="hover:text-primary hover:border-primary flex h-40 flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-500 transition-colors">
              <label
                htmlFor="image-upload"
                className="flex h-full w-full cursor-pointer flex-col items-center p-4"
              >
                <FaImage size={24} className="mb-2" />
                <span className="text-center text-sm">Tải lên hình ảnh</span>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploadingImages}
                />
              </label>
            </div>
          </div>
        </SortableContext>
      </DndContext>

      {uploadingImages && <p className="text-sm text-gray-500">Đang tải ảnh lên...</p>}

      <div className="mt-6 rounded-md bg-gray-50 p-4">
        <p className="mb-2 text-sm font-medium text-gray-500">Lưu ý:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-500">
          <li>Ảnh được đánh dấu "Ảnh chính" sẽ hiển thị đầu tiên trên trang sản phẩm</li>
          <li>Kéo thả để thay đổi thứ tự hiển thị của hình ảnh</li>
          <li>Nhấn vào biểu tượng ngôi sao để đặt ảnh làm ảnh chính</li>
          <li>Nên sử dụng hình ảnh có kích thước tối thiểu 800x800 pixels</li>
          <li>Định dạng hỗ trợ: JPG, PNG, WebP</li>
          <li>Kích thước tối đa: 5MB mỗi ảnh</li>
        </ul>
      </div>
    </div>
  )
}

export default ProductImages
