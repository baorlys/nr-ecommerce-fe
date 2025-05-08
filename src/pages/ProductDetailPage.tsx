'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar, FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa'
import Button from '../components/common/Button'
import { fetchProductBySlug } from '../store/slice/productsSlice'
// import { addToCart } from '../store/cartSlice'
import type { RootState, AppDispatch } from '../store'
import { formatCurrency } from '../utils/format'
import { ProductVariant } from '../types/product'
import ReviewSection from '../components/ui/ReviewSection'
import ShippingInfoSection from '../components/ui/ShippingInfoSection'
import { addToCart } from '../store/slice/cartSlice'

const ProductDetailPage = () => {
  const { productSlug } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const { product, loading } = useSelector((state: RootState) => state.products)

  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)

  useEffect(() => {
    if (productSlug) {
      dispatch(fetchProductBySlug(productSlug))
      window.scrollTo(0, 0)
    }
  }, [dispatch, productSlug])

  useEffect(() => {
    setSelectedVariant(product?.variants.find((v) => v.stockQuantity > 0) || null)
  }, [product])

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value)
    }
  }
  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant)
  }

  const handleOnRevewSubmit = () => {
    dispatch(fetchProductBySlug(productSlug || ''))
  }

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          variantName: selectedVariant?.name || product.variants[0].name,
          price: selectedVariant?.price || 0,
          image: product.images[0].imageUrl,
          quantity,
        }),
      )
    }
  }

  if (loading || !product) {
    return (
      <div className="container-custom py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="h-96 rounded-lg bg-gray-200"></div>
            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded bg-gray-200"></div>
              <div className="h-6 w-1/4 rounded bg-gray-200"></div>
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="mt-6 h-10 w-1/2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Placeholder images for development
  const placeholderImages = product.images.map((image) => image.imageUrl)

  return (
    <div className="container-custom py-8">
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm">
        <a href="/" className="hover:text-primary text-gray-500">
          Trang chủ
        </a>
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-primary text-gray-500">
          Sản phẩm
        </a>
        <span className="mx-2">/</span>
        <span className="text-primary">{product.name}</span>
      </div>

      {/* Product Detail */}
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div>
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={placeholderImages[activeImage % placeholderImages.length] || '/placeholder.svg'}
              alt={product.name}
              className="h-100 w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer overflow-hidden rounded-md border-2 ${
                  activeImage === index ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={placeholderImages[index % placeholderImages.length] || '/placeholder.svg'}
                  alt={`${product.name} - ${index + 1}`}
                  className="h-30 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

          <div className="mb-4 flex items-center">
            <div className="text-yellow flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(product.averageRating) ? 'text-yellow' : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-gray-500">({product.totalReviews} đánh giá)</span>
          </div>

          <div className="text-primary mb-4 text-2xl font-bold">
            {formatCurrency(selectedVariant?.price || 0)}
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{product.shortDescription}</p>
          </div>
          {/* Variant Selection */}
          {product.variants && (
            <div className="mb-6">
              <label className="mb-2 block font-medium text-gray-700">Chọn phiên bản</label>
              <div className="flex flex-wrap gap-4">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    disabled={!(variant.stockQuantity > 0)}
                    onClick={() => handleVariantChange(variant)}
                    className={`rounded-md border-2 px-4 py-2 ${
                      selectedVariant?.id === variant.id
                        ? 'border-primary text-primary'
                        : 'border-gray-300 text-gray-700'
                    } ${
                      !(variant.stockQuantity > 0)
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:border-primary hover:text-primary'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">Số lượng</label>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="rounded-l-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                <FaMinus />
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                className="w-20 border-y border-gray-300 px-3 py-2 text-center focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="rounded-r-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            {!selectedVariant || selectedVariant.stockQuantity <= 0 ? (
              <span className="text-xl text-red-500">Sản phẩm tạm hết hàng</span>
            ) : (
              <Button
                variant="cta"
                size="lg"
                className="flex flex-1 items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <FaCartPlus /> Thêm vào giỏ hàng
              </Button>
            )}
          </div>

          {/* Product Meta */}
          <div className="border-t border-gray-200 pt-4">
            <div className="mb-2 flex">
              <span className="w-32 font-medium">Danh mục:</span>
              <a
                href={`/products/${product.category.slug}`}
                className="text-primary hover:underline"
              >
                {product.category.name}
              </a>
            </div>

            <div className="flex">
              <span className="w-32 font-medium">Chia sẻ:</span>
              <div className="flex gap-2">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-red-600 hover:text-red-800">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'description'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Mô tả sản phẩm
            </button>
            <button
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Đánh giá ({product.totalReviews})
            </button>
            <button
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'shipping'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('shipping')}
            >
              Vận chuyển & Thanh toán
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h3 className="mb-4 text-xl font-semibold">Thông tin sản phẩm</h3>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {activeTab === 'reviews' && (
            <ReviewSection product={product} onReviewSubmit={handleOnRevewSubmit} />
          )}

          {activeTab === 'shipping' && <ShippingInfoSection />}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
