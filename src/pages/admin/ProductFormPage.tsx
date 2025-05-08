'use client'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoriesFlat } from '../../store/slice/admin/adminCategoriesSlice'
import type { RootState, AppDispatch } from '../../store'
import {
  fetchProductById,
  createProduct,
  updateProduct,
} from '../../store/slice/admin/adminProductsSlice'
import ProductForm, {
  initialValues as defaultInitialValues,
  type ProductFormValues,
} from '../../components/admin/product/ProductForm'

const ProductFormPage = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { categories } = useSelector((state: RootState) => state.adminCategories)
  const { product, loading } = useSelector((state: RootState) => state.adminProducts)

  const [formValues, setFormValues] = useState<ProductFormValues>({
    ...defaultInitialValues,
    images: [], // Explicitly initialize images as an empty array
  })

  const isEditMode = Boolean(productId)

  useEffect(() => {
    dispatch(
      fetchCategoriesFlat({
        page: 1 - 1,
        size: 10,
        filter: null,
      }),
    )

    if (isEditMode && productId) {
      dispatch(fetchProductById(productId))
    }
  }, [dispatch, isEditMode, productId])

  useEffect(() => {
    if (isEditMode && product) {
      // Transform product data to form values
      const productFormValues: ProductFormValues = {
        name: product.name || '',
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        categoryId: product.category?.id || '',
        images: Array.isArray(product.images) ? product.images : [], // Ensure images is always an array
        variants: product.variants || [],
        isFeatured: product.isFeatured || false,
      }
      setFormValues(productFormValues)
    }
  }, [isEditMode, product])

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      // Prepare product data - ensure all required fields are present
      const productData = {
        ...values,
        images: Array.isArray(values.images) ? values.images : [], // Ensure images is always an array
      }

      if (isEditMode && productId) {
        // For update, make sure we're passing the correct ID
        await dispatch(
          updateProduct({
            id: productId,
            productData,
          }),
        ).unwrap()
      } else {
        await dispatch(createProduct(productData)).unwrap()
      }
      navigate('/admin/products')
    } catch (error) {
      console.error('Error saving product:', error)
      throw error
    }
  }

  if (loading && isEditMode) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/products')}
            className="text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h1>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-md">
        <ProductForm
          initialValues={formValues}
          categories={categories}
          isEditMode={isEditMode}
          productId={productId}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/products')}
        />
      </div>
    </div>
  )
}

export default ProductFormPage
