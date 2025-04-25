'use client'

import React from 'react'

import { useState, useEffect } from 'react'
import { FaSearch, FaEdit, FaTrash, FaUserPlus, FaFilter } from 'react-icons/fa'
import Button from '../../components/common/Button'
import { users } from '../../mock'
import type { User } from '../../types/user'
import { formatDate } from '../../utils/format'

const UsersPage = () => {
  const [userList, setUserList] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null)
  const [roleFilter, setRoleFilter] = useState<string | null>(null)

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy danh sách người dùng
    // Ở đây sử dụng mock data
    setUserList(users)
  }, [])

  // Lọc người dùng theo tìm kiếm và vai trò
  const filteredUsers = userList.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter ? user.role === roleFilter : true
    return matchesSearch && matchesRole
  })

  // Sắp xếp người dùng
  const sortedUsers = React.useMemo(() => {
    const sortableUsers = [...filteredUsers]
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (sortConfig.key === 'name') {
          const aName = `${a.firstName} ${a.lastName}`
          const bName = `${b.firstName} ${b.lastName}`
          return sortConfig.direction === 'ascending'
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName)
        }

        if (sortConfig.key === 'createdAt') {
          return sortConfig.direction === 'ascending'
            ? new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime()
            : new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        }

        // Fallback for other fields
        const aValue = a[sortConfig.key as keyof User] as string
        const bValue = b[sortConfig.key as keyof User] as string

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableUsers
  }, [filteredUsers, sortConfig])

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)

  // Xử lý sắp xếp
  const requestSort = (key: string) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  // Xử lý xóa người dùng
  const handleDeleteUser = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      // Trong thực tế, sẽ gọi API để xóa người dùng
      // Ở đây chỉ cập nhật state
      setUserList(userList.filter((user) => user.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
        <Button variant="primary" className="flex items-center">
          <FaUserPlus className="mr-2" /> Thêm người dùng mới
        </Button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
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
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  onClick={() => requestSort('id')}
                >
                  ID
                </th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  onClick={() => requestSort('name')}
                >
                  Tên người dùng
                </th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  onClick={() => requestSort('email')}
                >
                  Email
                </th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  onClick={() => requestSort('role')}
                >
                  Vai trò
                </th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  onClick={() => requestSort('createdAt')}
                >
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentItems.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="text-primary px-6 py-4 text-sm font-medium whitespace-nowrap">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {user.avatar ? (
                          <img
                            src={user.avatar || '/placeholder.svg'}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white">
                            {user.firstName.charAt(0)}
                            {user.lastName.charAt(0)}
                          </div>
                        )}
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
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user.role === 'admin' ? 'Admin' : 'Khách hàng'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {user.createdAt ? formatDate(user.createdAt) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedUsers.length)} trong{' '}
              {sortedUsers.length} người dùng
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-md px-3 py-1 ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersPage
