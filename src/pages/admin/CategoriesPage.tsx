'use client'

import React from 'react'

import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFolder } from 'react-icons/fa'
import Button from '../../components/common/Button'
import { categories } from '../../mock'
import type { Category } from '../../types/category'

const CategoriesPage = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null)

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy danh sách danh mục
    // Ở đây sử dụng mock data
    setCategoryList(categories)
  }, [])

  // Lọc danh mục theo tìm kiếm
  const filteredCategories = categoryList.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sắp xếp danh mục
  const sortedCategories = React.useMemo(() => {
    const sortableCategories = [...filteredCategories]
    if (sortConfig !== null) {
      sortableCategories.sort((a, b) => {
        if (a[sortConfig.key as keyof Category] < b[sortConfig.key as keyof Category]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key as keyof Category] > b[sortConfig.key as keyof Category]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableCategories
  }, [filteredCategories, sortConfig])

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedCategories.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage)

  // Xử lý sắp xếp
  const requestSort = (key: string) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  // Xử lý xóa danh mục
  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      // Trong thực tế, sẽ gọi API để xóa danh mục
      // Ở đây chỉ cập nhật state
      setCategoryList(categoryList.filter((category) => category.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
        <Button variant="primary" className="flex items-center">
          <FaPlus className="mr-2" /> Thêm danh mục mới
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
              placeholder="Tìm kiếm danh mục..."
              className="focus:ring-primary w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                  Tên danh mục
                </th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  onClick={() => requestSort('slug')}
                >
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Danh mục cha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Số danh mục con
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentItems.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="text-primary px-6 py-4 text-sm font-medium whitespace-nowrap">
                    #{category.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
                        <FaFolder className="text-primary" />
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
                    {category.parentId
                      ? categoryList.find((c) => c.id === category.parentId)?.name
                      : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {category.subCategories?.length || 0}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
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
              Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedCategories.length)}{' '}
              trong {sortedCategories.length} danh mục
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

export default CategoriesPage
