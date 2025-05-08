'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa'
import Button from '../common/Button'
import Pagination from '../common/Pagination'
import ReviewFormModal from './ReviewFormModal'

import type { RootState, AppDispatch } from '../../store'
import { checkEligibility, deleteReview, fetchReviews } from '../../store/slice/reviewSlice'
import type { Review, ReviewFilterParams } from '../../types/review'
import type { ProductDetail } from '../../types/product'
import ConfirmModal from '../common/ConfirmModal'

interface ReviewSectionProps {
  product: ProductDetail
  onReviewSubmit: () => void
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ product, onReviewSubmit }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { reviews, loading, pagination, canReview } = useSelector(
    (state: RootState) => state.reviews,
  )
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [filters, setFilters] = useState<ReviewFilterParams>({ productId: product.id })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  useEffect(() => {
    dispatch(
      fetchReviews({
        page: currentPage - 1,
        size: itemsPerPage,
        filter: filters,
      }),
    )
    dispatch(
      checkEligibility({
        userId: user?.id || '',
        productId: product.id,
      }),
    )
  }, [dispatch, filters, currentPage, itemsPerPage, product.id, user?.id])

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      window.location.href = `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`
      return
    }
    setIsModalOpen(true)
  }

  const handleModalSubmit = () => {
    onReviewSubmit()
  }

  const handleDeleteReview = async (reviewId: string) => {
    await dispatch(deleteReview(reviewId))
    setSelectedReview(null)
    onReviewSubmit()
  }

  const renderStars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < Math.floor(rating) ? 'text-yellow' : 'text-gray-300'}
        size={20}
      />
    ))

  const renderReviewStars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < rating ? 'text-yellow' : 'text-gray-300'} size={14} />
    ))

  return (
    <div className="mb-10 rounded-lg bg-white p-6 shadow-md">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Đánh giá sản phẩm</h2>
        {canReview && (
          <div className="text-sm text-gray-500">
            <Button onClick={handleOpenModal}>Viết đánh giá</Button>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div>
        {loading && (
          <div className="flex h-40 items-center justify-center">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            Chưa có đánh giá nào cho sản phẩm này
          </div>
        )}

        {!loading && reviews.length > 0 && (
          <>
            {/* Rating Summary */}
            <div className="mb-10 flex flex-col items-start rounded-lg p-6 md:flex-row md:items-center md:justify-between md:gap-10">
              <div className="flex flex-1 items-center space-x-6">
                <div className="text-5xl font-extrabold text-yellow-500">
                  {product.averageRating?.toFixed(1)}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center">{renderStars(product.averageRating)}</div>
                  <div className="text-sm text-gray-500">{product.totalReviews} đánh giá</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => {
                const isOwnReview = user?.id === review.user.id
                return (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="mb-2 flex justify-between">
                      <div className="font-semibold">
                        {review.user.firstName} {review.user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{review.createdOn}</div>
                    </div>
                    <div className="mb-2 flex">{renderReviewStars(review.rating)}</div>
                    <p className="text-gray-700">{review.comment}</p>

                    {isOwnReview && (
                      <div className="mt-2 flex gap-2 text-sm">
                        <button
                          onClick={() => {
                            setSelectedReview(review)
                            setIsModalOpen(true)
                          }}
                          className="text-primary hover:underline"
                        >
                          Chỉnh sửa
                        </button>
                        <button
                          onClick={() => {
                            setSelectedReview(review)
                            setIsConfirmOpen(true)
                          }}
                          className="text-red-500 hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {pagination && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                  hasPrevious={pagination.hasPrevious}
                  hasNext={pagination.hasNext}
                  totalItems={pagination.totalItems}
                  pageSize={pagination.size}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Review Form Modal */}
      <ReviewFormModal
        productId={product.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => handleModalSubmit()}
        review={selectedReview}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          handleDeleteReview(selectedReview?.id || '')
          setIsConfirmOpen(false)
        }}
        title="Xóa đánh giá"
        message="Bạn có chắc chắn muốn xóa đánh giá này?"
      />
    </div>
  )
}

export default ReviewSection
