'use client'
import { useState, useEffect } from 'react'
import {  FaTrash} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../utils/format'
import { AppDispatch, RootState } from '../../store'
import { deleteUser, fetchUsers } from '../../store/slice/admin/adminUsersSlice'
import ConfirmModal from '../../components/common/ConfirmModal'
import Pagination from '../../components/common/Pagination'

const ManageUsersPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, pagination, loading } = useSelector((state: RootState) => state.adminUsers)
  // const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  // const [roleFilter, setRoleFilter] = useState<string | null>(null)

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined)
  useEffect(() => {
    dispatch(
      fetchUsers({
        page: currentPage - 1,
        size: itemsPerPage,
      }),
    )
  }, [dispatch, currentPage, itemsPerPage])

  const openConfirmModal = (userId: string) => {
    setSelectedUserId(userId)
    setIsConfirmModalOpen(true)
  }

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false)
    setSelectedUserId(undefined)
  }

  // Xử lý xóa người dùng
  const handleDeleteUser = async () => {
    if (selectedUserId) {
      await dispatch(deleteUser(selectedUserId)).unwrap()
      dispatch(
        fetchUsers({
          page: currentPage - 1,
          size: itemsPerPage,
        }),
      )
      closeConfirmModal()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        {/* <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
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
                value={roleFilter || ''}
                onChange={(e) => setRoleFilter(e.target.value || null)}
              >
                <option value="">Tất cả vai trò</option>
                <option value="admin">Admin</option>
                <option value="customer">Khách hàng</option>
              </select>
            </div>
          </div>
        </div> */}

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
                      Tên người dùng
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Vai trò
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Ngày tạo
                    </th>
                    <th className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="text-primary px-6 py-4 text-sm font-medium whitespace-nowrap">
                        #{user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white">
                              {user.firstName.charAt(0)}
                              {user.lastName.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                            user.role.name === 'ADMIN'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {user.role.name === 'ADMIN' ? 'Admin' : 'Khách hàng'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {user.createdOn ? formatDate(user.createdOn) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                            user.deleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {user.deleted ? 'Đã xóa' : 'Đang hoạt động'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <div className="flex justify-end space-x-2">
                          {!user.deleted ? (
                            <button
                              onClick={() => openConfirmModal(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash />
                            </button>
                          ) : (
                            <div></div>
                          )}
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
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        title="Xác nhận xóa người dùng"
        message="Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác."
        onConfirm={handleDeleteUser}
      />
    </div>
  )
}

export default ManageUsersPage
