'use client'

import type React from 'react'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaStar, FaTimes } from 'react-icons/fa'
import Button from '../common/Button'
import type { AppDispatch, RootState } from '../../store'
import { createReview, updateReview } from '../../store/slice/reviewSlice'
import type { Review, ReviewRequest } from '../../types/review'

interface ReviewFormModalProps {
  productId: string
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  review?: Review | null
}

const ReviewSchema = Yup.object().shape({
  rating: Yup.number().required('Vui lòng chọn số sao').min(1, 'Vui lòng chọn ít nhất 1 sao'),
  comment: Yup.string()
    .required('Vui lòng nhập nội dung đánh giá')
    .min(10, 'Đánh giá phải có ít nhất 10 ký tự')
    .max(500, 'Đánh giá không được vượt quá 500 ký tự'),
})

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  productId,
  isOpen,
  onClose,
  onSubmit,
  review,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { loading } = useSelector((state: RootState) => state.reviews)
  const [hoverRating, setHoverRating] = useState(0)

  if (!isOpen) return null

  const initialValues: ReviewRequest = {
    userId: user?.id || '',
    productId,
    rating: review?.rating || 0,
    comment: review?.comment || '',
  }

  const handleSubmit = async (values: ReviewRequest) => {
    if (review?.id) {
      await dispatch(updateReview({ id: review.id, request: values })).unwrap()
    } else {
      await dispatch(createReview(values)).unwrap()
    }
    onSubmit()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Viết đánh giá</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <div className="mb-6">
                <label className="mb-2 block font-medium">Đánh giá của bạn</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="cursor-pointer p-1"
                      onClick={() => setFieldValue('rating', star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <FaStar
                        size={24}
                        className={
                          (hoverRating ? star <= hoverRating : star <= values.rating)
                            ? 'text-yellow'
                            : 'text-gray-300'
                        }
                      />
                    </div>
                  ))}
                </div>
                {errors.rating && touched.rating && (
                  <div className="mt-1 text-sm text-red-500">{errors.rating}</div>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="comment" className="mb-2 block font-medium">
                  Nội dung đánh giá
                </label>
                <Field
                  as="textarea"
                  id="comment"
                  name="comment"
                  rows={4}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-2 focus:ring-1 focus:outline-none"
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
                <div className="mt-1 text-right text-xs text-gray-500">
                  {values.comment.length}/500 ký tự
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Hủy
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ReviewFormModal
