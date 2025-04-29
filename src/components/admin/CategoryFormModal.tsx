'use client'

import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaSave, FaImage, FaTimes } from 'react-icons/fa'
import Button from '../common/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategoriesFlat,
  fetchCategoryById,
  createCategory,
  updateCategory,
} from '../../store/slice/admin/adminCategoriesSlice'
import { uploadMedia } from '../../store/slice/mediaSlice'
import type { RootState, AppDispatch } from '../../store'
import { toast } from 'react-toastify'
import { CategoryRequest } from '../../types/category'

// Validation schema
const CategorySchema = Yup.object().shape({
  name: Yup.string().required('Tên danh mục là bắt buộc'),
  description: Yup.string().required('Mô tả danh mục là bắt buộc'),
  parentId: Yup.string().nullable(),
  imageUrl: Yup.string().url('URL không hợp lệ').required('URL là bắt buộc'),
})

interface CategoryFormValues {
  name: string
  description: string
  parentId: string | null
  imageUrl: string
}

const initialValues: CategoryFormValues = {
  name: '',
  description: '',
  parentId: null,
  imageUrl: '',
}

interface CategoryFormModalProps {
  isOpen: boolean
  onClose: () => void
  categoryId?: string
  onSuccess?: () => void
}

const CategoryFormModal = ({ isOpen, onClose, categoryId, onSuccess }: CategoryFormModalProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, category, loading } = useSelector((state: RootState) => state.adminCategories)

  const [uploadingImage, setUploadingImage] = useState(false)
  const [formValues, setFormValues] = useState<CategoryFormValues>(initialValues)
  const isEditMode = Boolean(categoryId)

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCategoriesFlat())
      if (isEditMode && categoryId) {
        dispatch(fetchCategoryById(categoryId))
      } else {
        setFormValues(initialValues)
      }
    }
  }, [dispatch, isEditMode, categoryId, isOpen])

  useEffect(() => {
    if (isEditMode && category) {
      // Transform category data to form values
      const categoryFormValues: CategoryFormValues = {
        name: category.name || '',
        description: category.description || '',
        parentId: category.parentId || null,
        imageUrl: category.imageUrl || '',
      }
      setFormValues(categoryFormValues)
    }
  }, [isEditMode, category])

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    setUploadingImage(false)
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setUploadingImage(true)
      const file = event.currentTarget.files[0]
      const formData = new FormData()
      formData.append('file', file)
      const response: any = await dispatch(uploadMedia(formData)).unwrap()
      setFieldValue('imageUrl', response)
      setUploadingImage(false)
      toast.success('Tải lên hình ảnh thành công')
    }
  }

  const removeImage = (setFieldValue: any) => {
    setFieldValue('imageUrl', '')
  }

  const handleSubmit = async (values: CategoryFormValues, { setSubmitting }: any) => {
    try {
      // Prepare category data
      const categoryData: CategoryRequest = {
        name: values.name,
        description: values.description || '',
        imageUrl: values.imageUrl || '',
        parentId: values.parentId || undefined,
      }

      if (isEditMode) {
        await dispatch(
          updateCategory({ id: categoryId as string, category: categoryData }),
        ).unwrap()
      } else {
        await dispatch(createCategory(categoryData)).unwrap()
      }

      if (onSuccess) {
        onSuccess()
      }
      onClose()
    } catch (error) {
      console.log(error)

      toast.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  // Filter out the current category and its children from parent options
  const getAvailableParentCategories = () => {
    if (!isEditMode) return categories

    // Function to get all child IDs recursively
    const getChildIds = (categoryId: string): string[] => {
      const directChildren = categories.filter((c) => c.parentId === categoryId)
      const childIds = directChildren.map((c) => c.id)

      return [...childIds, ...directChildren.flatMap((child) => getChildIds(child.id))]
    }

    const childIds = categoryId ? getChildIds(categoryId) : []
    return categories.filter((c) => c.id !== categoryId && !childIds.includes(c.id))
  }

  if (!isOpen) return null

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditMode ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          {loading && isEditMode ? (
            <div className="flex items-center justify-center py-12">
              <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
            </div>
          ) : (
            <Formik
              initialValues={formValues}
              validationSchema={CategorySchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, isSubmitting, setFieldValue }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                      Tên danh mục <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Mô tả <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      id="description"
                      rows={4}
                      className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="parentId"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Danh mục cha
                    </label>
                    <Field
                      as="select"
                      name="parentId"
                      id="parentId"
                      className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                    >
                      <option value="">Không có danh mục cha</option>
                      {getAvailableParentCategories().map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="parentId"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Hình ảnh danh mục <span className="text-red-500">*</span>
                    </label>
                    <div className="mb-4">
                      {values.imageUrl ? (
                        <div className="group relative">
                          <img
                            src={values.imageUrl || '/placeholder.svg'}
                            alt="Category"
                            className="h-48 w-full rounded-md border border-gray-300 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(setFieldValue)}
                            className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="hover:text-primary hover:border-primary flex h-48 flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-500 transition-colors">
                          <label
                            htmlFor="image-upload"
                            className="flex cursor-pointer flex-col items-center p-4"
                          >
                            <FaImage size={24} className="mb-2" />
                            <span className="text-sm">Tải lên hình ảnh</span>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, setFieldValue)}
                              disabled={uploadingImage}
                            />
                          </label>
                        </div>
                      )}
                      <ErrorMessage
                        name="imageUrl"
                        component="div"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                    {uploadingImage && <p className="text-sm text-gray-500">Đang tải ảnh lên...</p>}
                  </div>

                  <div className="flex justify-end space-x-3 border-t pt-5">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Hủy
                    </Button>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                      <FaSave className="mr-2" /> {isSubmitting ? 'Đang lưu...' : 'Lưu danh mục'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryFormModal
