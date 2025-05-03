'use client'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import Button from '../../common/Button'
import CategoryBasicInfo from './CategoryBasicInfo'
import CategoryImageUpload from './CategoryImageUpload'
import { useState } from 'react'

// Validation schema
export const CategorySchema = Yup.object().shape({
  name: Yup.string().required('Tên danh mục là bắt buộc'),
  description: Yup.string().required('Mô tả danh mục là bắt buộc'),
  parentId: Yup.string().nullable(),
  imageUrl: Yup.string().url('URL không hợp lệ').required('URL là bắt buộc'),
})

export interface CategoryFormValues {
  name: string
  description: string
  parentId: string | null
  imageUrl: string
}

export const initialValues: CategoryFormValues = {
  name: '',
  description: '',
  parentId: '',
  imageUrl: '',
}

interface CategoryFormProps {
  initialValues: CategoryFormValues
  categories: any[]
  isEditMode: boolean
  categoryId?: string
  isSubmitting?: boolean
  onSubmit: (values: CategoryFormValues) => Promise<void>
  onCancel: () => void
}

const CategoryForm = ({
  initialValues,
  categories,
  isEditMode,
  categoryId,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: CategoryFormProps) => {
  const [uploadingImage, setUploadingImage] = useState(false)

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

  const handleSubmit = async (values: CategoryFormValues, { setSubmitting }: any) => {
    try {
      await onSubmit(values)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CategorySchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, isSubmitting: formSubmitting, setFieldValue }) => (
        <Form className="space-y-6">
          <CategoryBasicInfo categories={getAvailableParentCategories()} />

          <CategoryImageUpload
            imageUrl={values.imageUrl}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
            setFieldValue={setFieldValue}
          />

          <div className="flex justify-end space-x-3 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting || formSubmitting}
            >
              Hủy
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting || formSubmitting}>
              <FaSave className="mr-2" />{' '}
              {isSubmitting || formSubmitting ? 'Đang lưu...' : 'Lưu danh mục'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CategoryForm
