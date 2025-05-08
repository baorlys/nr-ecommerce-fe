'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/ui/HeroSlider'
import ProductCard from '../components/ui/ProductCard'
import CategoryCard from '../components/ui/CategoryCard'
import Button from '../components/common/Button'
import { fetchFeaturedProducts } from '../store/slice/productsSlice'
import { fetchCategories } from '../store/slice/categoriesSlice'
import type { RootState, AppDispatch } from '../store'
import { Category } from '../types/category'
import { Product } from '../types/product'

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { featuredProducts, loading: productsLoading } = useSelector(
    (state: RootState) => state.products,
  )
  const { categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories,
  )

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories())
    }
  }, [dispatch, categories.length])

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  return (
    <div>
      <HeroSlider />

      {/* Categories Section */}
      <section className="bg-background py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Danh Mục Sản Phẩm</h2>
            <p className="text-gray-600">Khám phá các loại đồ ăn vặt đa dạng của chúng tôi</p>
          </div>

          {categoriesLoading ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-40 animate-pulse rounded-lg bg-gray-200"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {categories.map((category: Category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Sản Phẩm Nổi Bật</h2>
            <p className="text-gray-600">Những sản phẩm được yêu thích nhất của chúng tôi</p>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {featuredProducts.slice(0, 8).map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link to="/products">
                  <Button variant="cta" size="lg">
                    Xem tất cả sản phẩm
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
