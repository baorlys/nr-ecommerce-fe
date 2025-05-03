'use client'

import type { FC } from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { FaCartPlus } from 'react-icons/fa'
// import { addToCart } from '../../features/cart/cartSlice'
import type { Product } from '../../types/product'
import { formatCurrency } from '../../utils/format'

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  //   const dispatch = useDispatch()

  //   const handleAddToCart = () => {
  //     dispatch(
  //       addToCart({
  //         id: product.id,
  //         name: product.name,
  //         price: product.price,
  //         image: product.images[0],
  //         quantity: 1,
  //       }),
  //     )
  //   }
  const linkToDetail = `/san-pham/chi-tiet/${product.id}`

  return (
    <div className="overflow-hidden rounded-lg bg-white pb-5 shadow-md transition-transform hover:scale-105">
      <Link to={linkToDetail}>
        <div className="h-48 overflow-hidden">
          <img
            src={product.imageUrl || '/placeholder.svg'}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={linkToDetail}>
          <h3 className="hover:text-primary mb-1 truncate text-lg font-semibold">{product.name}</h3>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">{formatCurrency(product.price)}</span>
          <button
            // onClick={handleAddToCart}
            className="bg-orange rounded-full p-2 text-white transition-colors hover:bg-orange-700"
          >
            <FaCartPlus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
