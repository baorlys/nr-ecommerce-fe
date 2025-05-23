'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import Button from '../components/common/Button'
import { fetchProducts } from '../store/slice/productsSlice'
import { fetchCategories } from '../store/slice/categoriesSlice'
import type { RootState, AppDispatch } from '../store'
import { FaFilter, FaSort } from 'react-icons/fa'
import { ProductFilterParams } from '../types/product'
import { CategoryFlat } from '../types/category'
import Pagination from '../components/common/Pagination'
import { flattenCategories } from '../utils/convert'

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categorySlug } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  const { products, pagination, loading, error } = useSelector((state: RootState) => state.products)
  const { categories } = useSelector((state: RootState) => state.categories)

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('NEWEST')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 })
  const [filters, setFilters] = useState<ProductFilterParams>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9)
  const [showFilters, setShowFilters] = useState(false)

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // Compute categoriesFlat and sync filters when categories or categorySlug change
  useEffect(() => {
    const categoriesFlat: CategoryFlat[] = flattenCategories(categories)
    const currentCategory = categoriesFlat.find((cat) => cat.slug === categorySlug)
    const categoryIdFromSlug = currentCategory?.id || null

    setSelectedCategoryId(categoryIdFromSlug)
    setFilters((prev) => ({
      ...prev,
      categoryId: categoryIdFromSlug || undefined,
      search: searchQuery || prev.search,
    }))
  }, [categories, categorySlug, searchQuery])

  // Fetch products when filters, page, or itemsPerPage change
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage - 1,
        size: itemsPerPage,
        filter: filters,
      }),
    )
  }, [dispatch, filters, currentPage, itemsPerPage])

  const handleCategoryChange = (catId: string | null) => {
    setSelectedCategoryId(catId)
    setFilters((prev) => ({ ...prev, categoryId: catId || undefined }))
  }

  const handleSortChange = (value: 'NEWEST' | 'PRICE_ASC' | 'PRICE_DESC') => {
    setSortBy(value)
    setFilters((prev) => ({ ...prev, sortBy: value }))
  }

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setPriceRange((prev) => ({ ...prev, [type]: value }))
    setFilters((prev) => ({ ...prev, [`${type}Price`]: value }))
  }

  const resetFilters = () => {
    const categoriesFlat: CategoryFlat[] = flattenCategories(categories)
    const currentCategory = categoriesFlat.find((cat) => cat.slug === categorySlug)
    const categoryIdFromSlug = currentCategory?.id || null

    setSelectedCategoryId(categoryIdFromSlug)
    setSortBy('NEWEST')
    setPriceRange({ min: 0, max: 1000000 })
    setFilters({
      categoryId: categoryIdFromSlug || undefined,
      search: searchQuery || undefined,
    })
  }

  const categoriesFlat: CategoryFlat[] = flattenCategories(categories)

  return (
    <div className="container-custom h-min-screen py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Mobile Filters Button */}
        <div className="mb-4 md:hidden">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2"
          >
            <FaFilter /> {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
          </Button>
        </div>

        {/* Sidebar Filters */}
        <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-20 rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-4 text-lg font-bold">Bộ lọc</h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="mb-2 font-semibold">Danh mục</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all-categories"
                    name="category"
                    checked={selectedCategoryId === null}
                    onChange={() => handleCategoryChange(null)}
                    className="mr-2"
                  />
                  <label htmlFor="all-categories">Tất cả sản phẩm</label>
                </div>

                {categoriesFlat.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category.id}`}
                      name="category"
                      checked={selectedCategoryId === category.id}
                      onChange={() => handleCategoryChange(category.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category.id}`}>{category.name}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="mb-2 font-semibold">Khoảng giá</h4>
              <div className="space-y-3">
                <div>
                  <label htmlFor="min-price" className="mb-1 block text-sm">
                    Từ: {priceRange.min.toLocaleString('vi-VN')}đ
                  </label>
                  <input
                    type="range"
                    id="min-price"
                    min="0"
                    max="500000"
                    step="10000"
                    name="minPrice"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="max-price" className="mb-1 block text-sm">
                    Đến: {priceRange.max.toLocaleString('vi-VN')}đ
                  </label>
                  <input
                    type="range"
                    id="max-price"
                    min="0"
                    max="1000000"
                    step="10000"
                    name="maxPrice"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={resetFilters}>
                Đặt lại
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4">
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold">
              {searchQuery
                ? `Kết quả tìm kiếm cho "${searchQuery}"`
                : selectedCategoryId
                  ? categoriesFlat.find((cat) => cat.id === selectedCategoryId)?.name
                  : 'Tất cả sản phẩm'}
            </h1>

            <div className="flex items-center justify-between">
              <p className="text-gray-600">{pagination?.totalItems} sản phẩm</p>

              <div className="flex items-center">
                <span className="mr-2 hidden sm:inline">Sắp xếp theo:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      handleSortChange(e.target.value as 'NEWEST' | 'PRICE_ASC' | 'PRICE_DESC')
                    }
                    className="focus:ring-primary appearance-none rounded-md border border-gray-300 bg-white py-2 pr-10 pl-3 focus:ring-2 focus:outline-none"
                  >
                    <option value="NEWEST">Mới nhất</option>
                    <option value="PRICE_ASC">Giá: Thấp đến cao</option>
                    <option value="PRICE_DESC">Giá: Cao đến thấp</option>
                  </select>
                  <FaSort className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-md bg-red-100 p-4 text-red-700">
              Đã xảy ra lỗi khi tải sản phẩm. Vui lòng thử lại sau.
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="mb-2 text-xl font-semibold">Không tìm thấy sản phẩm</h3>
              <p className="mb-6 text-gray-600">
                Vui lòng thử lại với bộ lọc khác hoặc xem tất cả sản phẩm của chúng tôi.
              </p>
              <Button variant="primary" onClick={resetFilters}>
                Xem tất cả sản phẩm
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

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
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
