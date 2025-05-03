import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="container-custom py-16">
      <div className="text-center">
        <h1 className="text-primary mb-4 text-9xl font-bold">404</h1>
        <h2 className="mb-4 text-3xl font-bold">Không tìm thấy trang</h2>
        <p className="mx-auto mb-8 max-w-md text-gray-600">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Quay lại trang chủ
          </Button>
        </Link>
      </div>
    </div>
  )
}
