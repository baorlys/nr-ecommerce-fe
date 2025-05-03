'use client'

import { Field } from 'formik'
import { FaGripLines, FaTrash } from 'react-icons/fa'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ProductImage } from '../../../types/product'

interface SortableImageProps {
  image: ProductImage
  index: number
  removeImage: () => void
  setPrimaryImage: () => void
}

const SortableImage = ({ image, index, removeImage, setPrimaryImage }: SortableImageProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `image-${index}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-md border ${image.isPrimary ? 'border-primary border-2' : 'border-gray-300'}`}
    >
      <Field type="hidden" name={`images.${index}.id`} />
      <Field type="hidden" name={`images.${index}.imageUrl`} />
      <Field type="hidden" name={`images.${index}.isPrimary`} />
      <Field type="hidden" name={`images.${index}.sortOrder`} />

      <div className="h-40 overflow-hidden rounded-md">
        <img
          src={image.imageUrl || '/placeholder.svg'}
          alt={image.altText}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="group-hover:bg-opacity-30 absolute inset-0 flex items-center justify-center bg-black/0 transition-opacity">
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 cursor-move rounded-full bg-white p-1 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <FaGripLines size={14} className="text-gray-600" />
        </div>

        {!image.isPrimary && (
          <button
            type="button"
            onClick={setPrimaryImage}
            className="absolute top-2 left-10 rounded-full bg-blue-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
            title="Đặt làm ảnh chính"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        )}

        <button
          type="button"
          onClick={removeImage}
          className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <FaTrash size={14} />
        </button>
      </div>

      {image.isPrimary && (
        <div className="bg-primary absolute right-0 bottom-0 left-0 py-1 text-center text-xs text-white">
          Ảnh chính
        </div>
      )}
    </div>
  )
}

export default SortableImage
