import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const ForbiddenPage = () => {
  return (
    <div className="container-custom py-16">
      <div className="text-center">
        <h1 className="text-primary mb-4 text-9xl font-bold">403</h1>
        <h2 className="mb-4 text-3xl font-bold">Không có quyền truy cập</h2>
        <p className="mx-auto mb-8 max-w-md text-gray-600">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng
          đây là lỗi.
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

export default ForbiddenPage
