import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasPrevious: boolean
  hasNext: boolean
  onPageChange: (page: number) => void
  totalItems: number
  pageSize: number
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  onPageChange,
  totalItems,
  pageSize,
}) => {
  const indexOfFirstItem = currentPage * pageSize
  const indexOfLastItem = Math.min(indexOfFirstItem + pageSize, totalItems)

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Hiển thị {indexOfFirstItem + 1}-{indexOfLastItem} trong {totalItems} kết quả
      </div>
      <div className="flex space-x-1">
        <button
          onClick={() => onPageChange(currentPage)}
          disabled={!hasPrevious}
          className="rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          Trước
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-md px-3 py-1 ${
              page === currentPage + 1
                ? 'bg-primary text-white'
                : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 2)}
          disabled={!hasNext}
          className="rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  )
}

export default Pagination
