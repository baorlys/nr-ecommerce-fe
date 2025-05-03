import { ProductDetail } from '../../types/product'
import { FaStar } from 'react-icons/fa'
import Button from '../common/Button'

export default function Review({ product }: { product: ProductDetail }) {
  return (
    <div>
      <div className="mb-6 flex items-center">
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-semibold">Đánh giá khách hàng</h3>
          <div className="flex items-center">
            <div className="mr-4 text-5xl font-bold">{product.rating.toFixed(1)}</div>
            <div>
              <div className="text-yellow mb-1 flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.floor(product.rating) ? 'text-yellow' : 'text-gray-300'}
                    size={20}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">Dựa trên {product.reviewCount} đánh giá</div>
            </div>
          </div>
        </div>
        <div>
          <Button variant="primary">Viết đánh giá</Button>
        </div>
      </div>

      <div className="space-y-6">
        {product.reviews?.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-6">
            <div className="mb-2 flex justify-between">
              <div className="font-semibold">{review.name}</div>
              <div className="text-sm text-gray-500">{review.date}</div>
            </div>
            <div className="text-yellow mb-2 flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < review.rating ? 'text-yellow' : 'text-gray-300'}
                  size={14}
                />
              ))}
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
