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
                <Link to="/san-pham">
                  <Button variant="cta" size="lg">
                    Xem tất cả sản phẩm
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold">Tại Sao Chọn Chúng Tôi?</h2>
            <p className="text-white/80">
              Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho khách hàng
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Chất Lượng Đảm Bảo</h3>
              <p className="text-white/80">
                Sản phẩm được chọn lọc kỹ càng, đảm bảo vệ sinh an toàn thực phẩm
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Giao Hàng Nhanh Chóng</h3>
              <p className="text-white/80">
                Đơn hàng được xử lý và giao đến tay khách hàng trong thời gian ngắn nhất
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Thanh Toán An Toàn</h3>
              <p className="text-white/80">
                Nhiều phương thức thanh toán an toàn, bảo mật thông tin khách hàng
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold">Khách Hàng Nói Gì?</h2>
            <p className="text-gray-600">
              Những đánh giá từ khách hàng đã trải nghiệm sản phẩm của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="text-yellow mb-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-600">
                "Khô gà lá chanh ở đây thơm ngon, vị vừa ăn. Đóng gói cẩn thận, giao hàng nhanh. Sẽ
                ủng hộ tiếp!"
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-gray-300"></div>
                <div>
                  <h4 className="font-semibold">Nguyễn Văn A</h4>
                  <p className="text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="text-yellow mb-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-600">
                "Đặt combo đồ ăn vặt cho cả nhà, ai cũng khen ngon. Giá cả hợp lý, sẽ tiếp tục ủng
                hộ shop."
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-gray-300"></div>
                <div>
                  <h4 className="font-semibold">Trần Thị B</h4>
                  <p className="text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="text-yellow mb-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-600">
                "Khô bò miếng rất ngon, thơm, không quá mặn. Đóng gói kỹ, giao hàng đúng hẹn. Rất
                hài lòng!"
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-gray-300"></div>
                <div>
                  <h4 className="font-semibold">Lê Văn C</h4>
                  <p className="text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-yellow/20 py-12">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-2 text-3xl font-bold">Đăng Ký Nhận Thông Tin</h2>
            <p className="mb-6 text-gray-600">
              Nhận thông tin về sản phẩm mới và khuyến mãi hấp dẫn
            </p>

            <form className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="focus:ring-primary flex-grow rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:outline-none"
                required
              />
              <Button type="submit" variant="primary" size="lg">
                Đăng ký
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
