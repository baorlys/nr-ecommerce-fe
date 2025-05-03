'use client'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import Button from '../../common/Button'
import { type ProductImage, type ProductVariant } from '../../../types/product'
import TabsNavigation from '../TabsNavigation'
import { useState } from 'react'
import ProductGeneralInfo from './ProductGeneralInfo'
import ProductVariants from './ProductVariants'
import ProductImages from './ProductImages'

// Validation schema
export const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Tên sản phẩm là bắt buộc'),
  description: Yup.string().required('Mô tả sản phẩm là bắt buộc'),
  shortDescription: Yup.string().required('Mô tả ngắn là bắt buộc'),
  categoryId: Yup.string().required('Danh mục là bắt buộc'),
  isFeatured: Yup.boolean(),
  variants: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Tên biến thể là bắt buộc'),
        price: Yup.number().positive('Giá phải là số dương').required('Giá là bắt buộc'),
        stockQuantity: Yup.number()
          .min(0, 'Số lượng không được âm')
          .required('Số lượng là bắt buộc'),
      }),
    )
    .min(1, 'Phải có ít nhất một phân loại'),
  images: Yup.array().of(
    Yup.object().shape({
      imageUrl: Yup.string().url('URL không hợp lệ').required('URL hình ảnh là bắt buộc'),
      altText: Yup.string().required('Văn bản thay thế là bắt buộc'),
      isPrimary: Yup.boolean(),
      sortOrder: Yup.number().min(0, 'Thứ tự phải là số dương'),
    }),
  ),
})

export interface ProductFormValues {
  name: string
  description: string
  shortDescription: string
  categoryId: string
  images: ProductImage[]
  variants: ProductVariant[]
  isFeatured: boolean
}

export const initialValues: ProductFormValues = {
  name: '',
  description: '',
  shortDescription: '',
  categoryId: '',
  images: [], // Ensure this is initialized as an empty array
  variants: [
    {
      id: null,
      name: 'Mặc định',
      price: 0,
      stockQuantity: 0,
    },
  ],
  isFeatured: false,
}

interface ProductFormProps {
  initialValues: ProductFormValues
  categories: any[]
  isEditMode: boolean
  productId?: string
  isSubmitting?: boolean
  onSubmit: (values: ProductFormValues) => Promise<void>
  onCancel: () => void
}

const ProductForm = ({
  initialValues,
  categories,
  isEditMode,
  productId,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const [activeTab, setActiveTab] = useState('general')
  const [uploadingImages, setUploadingImages] = useState(false)

  // Ensure images is always an array in initialValues
  const formInitialValues = {
    ...initialValues,
    images: Array.isArray(initialValues.images) ? initialValues.images : [],
  }

  const tabs = [
    { id: 'general', label: 'Thông tin chung', icon: null },
    { id: 'variants', label: 'Phân loại', icon: null },
    { id: 'media', label: 'Hình ảnh & Media', icon: null },
  ]

  const handleSubmit = async (values: ProductFormValues, { setSubmitting }: any) => {
    try {
      // Log the values being submitted
      console.log('Form values being submitted:', values)

      // Make sure to include the product ID if in edit mode
      const dataToSubmit = isEditMode && productId ? { ...values, id: productId } : values

      await onSubmit(dataToSubmit)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  // This function prevents form submission when changing tabs
  const handleTabChange = (tabId: string) => {
    // Prevent default behavior that might cause form submission
    setActiveTab(tabId)
  }

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={ProductSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, isSubmitting: formSubmitting, setFieldValue }) => (
        <Form>
          <div className="px-6 pt-6">
            <TabsNavigation tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          <div className="p-6">
            {/* General Info Tab */}
            {activeTab === 'general' && (
              <div key="general-tab" className="tab-content">
                <ProductGeneralInfo categories={categories} />
              </div>
            )}

            {/* Variants Tab */}
            {activeTab === 'variants' && (
              <div key="variants-tab" className="tab-content">
                <ProductVariants />
              </div>
            )}

            {/* Images & Media Tab */}
            {activeTab === 'media' && (
              <div key="media-tab" className="tab-content">
                <ProductImages
                  images={values.images || []} // Ensure images is always an array
                  uploadingImages={uploadingImages}
                  setUploadingImages={setUploadingImages}
                  setFieldValue={setFieldValue}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 border-t p-6">
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
              {isSubmitting || formSubmitting ? 'Đang lưu...' : 'Lưu sản phẩm'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ProductForm
