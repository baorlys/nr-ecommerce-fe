'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFolder } from 'react-icons/fa'
import Button from '../../components/common/Button'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoriesFlat, deleteCategory } from '../../store/slice/admin/adminCategoriesSlice'
import type { RootState, AppDispatch } from '../../store'
import ConfirmModal from '../../components/common/ConfirmModal'
import Pagination from '../../components/common/Pagination'

const ManageCategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, loading, pagination } = useSelector(
    (state: RootState) => state.adminCategories,
  )

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Modal state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined)

  useEffect(() => {
    dispatch(
      fetchCategoriesFlat({
        page: currentPage - 1,
        size: itemsPerPage,
        filter: {
          search: searchTerm,
        },
      }),
    )
  }, [dispatch, currentPage, itemsPerPage, searchTerm])

  // Xử lý xóa danh mục
  const handleDeleteCategory = async () => {
    if (selectedCategoryId) {
      try {
        await dispatch(deleteCategory(selectedCategoryId)).unwrap()
        closeConfirmModal()
      } catch (error) {
        console.error('Failed to delete category:', error)
      }
    }
  }

  const openConfirmModal = (id: string) => {
    setSelectedCategoryId(id)
    setIsConfirmModalOpen(true)
  }

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false)
    setSelectedCategoryId(undefined)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
        <Link to="/admin/categories/add">
          <Button variant="primary" className="flex items-center">
            <FaPlus className="mr-2" /> Thêm danh mục mới
          </Button>
        </Link>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              className="focus:ring-primary w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Tên danh mục
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Danh mục cha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Ngày tạo
                    </th>
                    <td className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Ngày cập nhật
                    </td>

                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="text-primary px-6 py-4 text-sm font-medium whitespace-nowrap">
                        #{category.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
                            {category.imageUrl ? (
                              <img
                                src={category.imageUrl || '/placeholder.svg'}
                                alt={category.name}
                                className="h-10 w-10 rounded-md object-cover"
                              />
                            ) : (
                              <FaFolder className="text-primary" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {category.slug}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {category.parentId ? (
                          <span className="text-gray-700">
                            {categories.find((c) => c.id === category.parentId)?.name}
                          </span>
                        ) : (
                          <span className="text-gray-400">Không có</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {new Date(category.createdOn).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {new Date(category.updatedOn).toLocaleDateString('vi-VN')}
                      </td>

                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/admin/categories/edit/${category.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => openConfirmModal(category.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                hasPrevious={pagination.hasPrevious}
                hasNext={pagination.hasNext}
                onPageChange={(page) => setCurrentPage(page)}
                totalItems={pagination.totalItems}
                pageSize={pagination.size}
              />
            )}
          </>
        )}
      </div>

      {/* Confirm Modal for Delete Category */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        title="Xác nhận xóa danh mục"
        message="Bạn có chắc chắn muốn xóa danh mục này?"
        onConfirm={handleDeleteCategory}
      />
    </div>
  )
}

export default ManageCategoriesPage
