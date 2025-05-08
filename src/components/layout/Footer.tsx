import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import Logo from '../common/Logo'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { useEffect } from 'react'
import { fetchCategories } from '../../store/slice/categoriesSlice'

export default function Footer() {
  const dispatch = useDispatch<AppDispatch>()
  const { categories } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    if (categories.length == 0) {
      dispatch(fetchCategories())
    }
  }, [dispatch, categories.length])

  return (
    <footer className="bg-primary pt-10 pb-6 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-4">
              <Logo variant="light" />
            </div>
            <p className="mb-4 text-sm">
              Chuyên cung cấp các loại đồ ăn vặt Việt Nam chất lượng cao, đảm bảo vệ sinh an toàn
              thực phẩm.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-yellow text-sm">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-yellow text-sm">
                  Sản phẩm
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/products/${category.slug}`} className="hover:text-yellow text-sm">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Thông tin liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Etown 3</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 flex-shrink-0" />
                <span className="text-sm">0123 456 789</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 flex-shrink-0" />
                <span className="text-sm">info@vietfood.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VietFood. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
