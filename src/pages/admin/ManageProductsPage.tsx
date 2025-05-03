'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa'
import Button from '../../components/common/Button'
import { fetchAdminProducts, deleteProduct } from '../../store/slice/admin/adminProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import Pagination from '../../components/common/Pagination'
import ConfirmModal from '../../components/common/ConfirmModal'

const ManageProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, pagination, loading } = useSelector((state: RootState) => state.adminProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Confirm modal state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined)

  useEffect(() => {
    dispatch(
      fetchAdminProducts({
        page: currentPage - 1,
        size: itemsPerPage,
        // filter: {
        //   search: searchTerm,
        //   categoryId: selectedCategory || undefined,
        // },
      }),
    )
  }, [dispatch, currentPage, itemsPerPage, searchTerm, selectedCategory])

  // Danh sách danh mục duy nhất
  const categories = Array.from(new Set(products.map((product) => product.categoryId))).map(
    (categoryId) => {
      const product = products.find((product) => product.categoryId === categoryId)
      return {
        id: categoryId,
        name: product ? product.categoryName : 'Chưa phân loại',
      }
    },
  )

  const openConfirmModal = (productId: string) => {
    setSelectedProductId(productId)
    setIsConfirmModalOpen(true)
  }

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false)
    setSelectedProductId(undefined)
  }

  const handleDeleteProduct = async () => {
    if (selectedProductId) {
      try {
        await dispatch(deleteProduct(selectedProductId)).unwrap()
        dispatch(
          fetchAdminProducts({
            page: currentPage,
            size: itemsPerPage,
            filter: {
              search: searchTerm,
              categoryId: selectedCategory || undefined,
            },
          }),
        )
        closeConfirmModal()
      } catch (error) {
        console.error('Failed to delete product:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
        <Link to="/admin/san-pham/them-moi">
          <Button variant="primary" className="flex items-center">
            <FaPlus className="mr-2" /> Thêm sản phẩm mới
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
              placeholder="Tìm kiếm sản phẩm..."
              className="focus:ring-primary w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="focus:ring-primary w-full appearance-none rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Tên sản phẩm
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Danh mục
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Nổi bật
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Số lượng loại
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Đánh giá trung bình
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Ngày tạo
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Cập nhật
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="text-primary px-6 py-4 text-sm font-medium whitespace-nowrap">
                          #{product.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                src={product.imageUrl || '/placeholder.svg'}
                                alt={product.name}
                                className="h-10 w-10 rounded object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">{product.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                          {product.categoryName}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          {product.isFeatured ? 'Nổi bật' : 'Không'}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          {product.numberOfVariants}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          {product.averageRating} ({product.totalReviews})
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          {new Date(product.createdOn).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          {new Date(product.updatedOn).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/admin/san-pham/chinh-sua/${product.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => openConfirmModal(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                        Không tìm thấy sản phẩm nào
                      </td>
                    </tr>
                  )}
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

      {/* Confirm Modal for Delete Product */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        title="Xác nhận xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác."
        onConfirm={handleDeleteProduct}
      />
    </div>
  )
}

export default ManageProductsPage
