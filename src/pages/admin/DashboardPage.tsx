'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBoxes,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa'
import { formatCurrency } from '../../utils/format'

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentOrders: [],
    salesData: [],
  })

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy dữ liệu thống kê
    // Ở đây chỉ giả lập dữ liệu
    const mockStats = {
      totalSales: 15750000,
      totalOrders: 42,
      totalProducts: 24,
      totalUsers: 156,
      recentOrders: [
        {
          id: '1',
          customer: 'Nguyễn Văn A',
          date: '15/05/2023',
          total: 300000,
          status: 'delivered',
        },
        {
          id: '2',
          customer: 'Trần Thị B',
          date: '14/05/2023',
          total: 235000,
          status: 'processing',
        },
        {
          id: '3',
          customer: 'Lê Văn C',
          date: '13/05/2023',
          total: 450000,
          status: 'shipped',
        },
        {
          id: '4',
          customer: 'Phạm Thị D',
          date: '12/05/2023',
          total: 180000,
          status: 'delivered',
        },
        {
          id: '5',
          customer: 'Hoàng Văn E',
          date: '11/05/2023',
          total: 520000,
          status: 'cancelled',
        },
      ],
      salesData: [
        { month: 'T1', sales: 5200000 },
        { month: 'T2', sales: 6100000 },
        { month: 'T3', sales: 4800000 },
        { month: 'T4', sales: 5500000 },
        { month: 'T5', sales: 7200000 },
        { month: 'T6', sales: 6800000 },
      ],
    }

    setStats(mockStats)
  }, [])

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận'
      case 'processing':
        return 'Đang xử lý'
      case 'shipped':
        return 'Đang giao hàng'
      case 'delivered':
        return 'Đã giao hàng'
      case 'cancelled':
        return 'Đã hủy'
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="bg-primary/10 text-primary rounded-full p-3">
              <FaChartLine size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Doanh thu</h3>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalSales)}
                </p>
                <span className="ml-2 flex items-center text-sm font-medium text-green-600">
                  <FaArrowUp className="mr-1" />
                  12%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="bg-orange/10 text-orange rounded-full p-3">
              <FaShoppingCart size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Đơn hàng</h3>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                <span className="ml-2 flex items-center text-sm font-medium text-green-600">
                  <FaArrowUp className="mr-1" />
                  8%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="bg-yellow/10 text-yellow rounded-full p-3">
              <FaBoxes size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Sản phẩm</h3>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                <span className="ml-2 flex items-center text-sm font-medium text-red-600">
                  <FaArrowDown className="mr-1" />
                  3%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-500/10 p-3 text-blue-500">
              <FaUsers size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Người dùng</h3>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                <span className="ml-2 flex items-center text-sm font-medium text-green-600">
                  <FaArrowUp className="mr-1" />
                  15%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Doanh thu theo tháng</h2>
            <select className="rounded-md border-gray-300 text-sm">
              <option>6 tháng gần đây</option>
              <option>12 tháng gần đây</option>
              <option>Năm nay</option>
            </select>
          </div>
          <div className="flex h-64 items-end space-x-2">
            {stats.salesData.map((data, index) => (
              <div key={index} className="flex flex-1 flex-col items-center">
                <div
                  className="bg-primary w-full rounded-t-sm"
                  style={{
                    height: `${(data.sales / 8000000) * 100}%`,
                  }}
                ></div>
                <div className="mt-2 text-xs text-gray-500">{data.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Đơn hàng gần đây</h2>
            <Link to="/admin/don-hang" className="text-primary text-sm hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Mã đơn
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Khách hàng
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Ngày
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Tổng tiền
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="text-primary px-4 py-3 text-sm font-medium whitespace-nowrap">
                      #{order.id}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium whitespace-nowrap">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getStatusBadgeClass(
                          order.status,
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
