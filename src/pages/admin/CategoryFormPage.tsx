'use client'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategoriesFlat,
  fetchCategoryById,
  createCategory,
  updateCategory,
} from '../../store/slice/admin/adminCategoriesSlice'
import type { RootState, AppDispatch } from '../../store'
import type { CategoryRequest } from '../../types/category'
import CategoryForm, {
  type CategoryFormValues,
  initialValues as defaultInitialValues,
} from '../../components/admin/category/CategoryForm'

const CategoryFormPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { categories, category, loading } = useSelector((state: RootState) => state.adminCategories)

  const [formValues, setFormValues] = useState<CategoryFormValues>(defaultInitialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = Boolean(categoryId)

  useEffect(() => {
    dispatch(fetchCategoriesFlat())
    if (isEditMode && categoryId) {
      dispatch(fetchCategoryById(categoryId))
    } else {
      setFormValues(defaultInitialValues)
    }
  }, [dispatch, isEditMode, categoryId])

  useEffect(() => {
    if (isEditMode && category) {
      // Transform category data to form values
      const categoryFormValues: CategoryFormValues = {
        name: category.name || '',
        description: category.description || '',
        parentId: category.parentId || null,
        imageUrl: category.imageUrl || '',
      }
      console.log(category)

      setFormValues(categoryFormValues)
    }
  }, [isEditMode, category])

  const handleSubmit = async (values: CategoryFormValues) => {
    setIsSubmitting(true)
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

      navigate('/admin/danh-muc')
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate('/admin/danh-muc')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={handleCancel} className="text-gray-600 hover:text-gray-900">
            <FaArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditMode ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </h1>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        {loading && isEditMode ? (
          <div className="flex items-center justify-center py-12">
            <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
          </div>
        ) : (
          <CategoryForm
            initialValues={formValues}
            categories={categories}
            isEditMode={isEditMode}
            categoryId={categoryId}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default CategoryFormPage
