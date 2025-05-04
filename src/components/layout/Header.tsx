'use client'

import type React from 'react'

import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaUser,
  FaSignOutAlt,
  FaUserCircle,
} from 'react-icons/fa'
import type { RootState, AppDispatch } from '../../store'
import { fetchCategories } from '../../store/slice/categoriesSlice'
import Logo from '../common/Logo'
import { Category } from '../../types/category'
import { logout } from '../../store/slice/authSlice'
import { FaUserPen } from 'react-icons/fa6'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

  const userDropdownRef = useRef<HTMLDivElement>(null)

  const { cartItems } = useSelector((state: RootState) => state.cart)
  const { user } = useSelector((state: RootState) => state.auth)
  const { categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories,
  )

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    if (categories.length == 0) {
      dispatch(fetchCategories())
    }
  }, [dispatch, categories.length])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/san-pham?search=${searchQuery}`)
      setIsMenuOpen(false)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setIsUserDropdownOpen(false)
  }

  const mainCategories = categories

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-textColor p-2">
              <FaBars size={24} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link to="/" className="text-textColor hover:text-primary font-medium">
              Trang chủ
            </Link>

            {/* Categories dropdown */}
            <div className="relative">
              <button
                className="text-textColor hover:text-primary flex items-center font-medium"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                onMouseEnter={() => setIsCategoryOpen(true)}
              >
                Sản phẩm
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {isCategoryOpen && (
                <div
                  className="absolute left-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg"
                  onMouseEnter={() => setIsCategoryOpen(true)}
                  onMouseLeave={() => setIsCategoryOpen(false)}
                >
                  {!categoriesLoading &&
                    mainCategories.map((category) => (
                      <CategoryItem
                        key={category.id}
                        category={category}
                        onClose={() => setIsCategoryOpen(false)}
                      />
                    ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search, Cart, User */}
          <div className="hidden items-center space-x-4 md:flex">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="focus:ring-primary rounded-full border border-gray-300 py-2 pr-10 pl-3 text-sm focus:ring-2 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="hover:text-primary absolute top-0 right-0 mt-2 mr-3 text-gray-400"
              >
                <FaSearch />
              </button>
            </form>

            <Link to="/gio-hang" className="relative p-2">
              <FaShoppingCart size={20} className="text-textColor hover:text-primary" />
              {/* {totalItems > 0 && (
                <span className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                  {totalItems}
                </span>
              )} */}
            </Link>

            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="p-2 focus:outline-none"
              >
                {!user ? (
                  <Link to="/dang-nhap">
                    <FaUser size={20} className="text-textColor hover:text-primary" />
                  </Link>
                ) : (
                  <FaUserCircle size={20} className="text-purple hover:text-primary" />
                )}
              </button>

              {isUserDropdownOpen && user && (
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                  <div className="border-b border-gray-100 px-4 py-2">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="truncate text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/tai-khoan"
                    className="block flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <FaUserPen className="mr-2" /> Thông tin tài khoản
                  </Link>
                  <Link
                    to="/don-hang"
                    className="block flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <FaShoppingCart className="mr-2" /> Đơn hàng của tôi
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mt-4 pb-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-textColor hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <button
                  className="text-textColor hover:text-primary flex w-full items-center justify-between font-medium"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  Sản phẩm
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${isCategoryOpen ? 'rotate-180 transform' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {isCategoryOpen && (
                  <div className="space-y-2 pl-4">
                    {!categoriesLoading &&
                      mainCategories.map((category) => (
                        <MobileCategoryItem
                          key={category.id}
                          category={category}
                          onClick={() => setIsMenuOpen(false)}
                          level={0}
                        />
                      ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="focus:ring-primary w-full rounded-full border border-gray-300 py-2 pr-10 pl-3 text-sm focus:ring-2 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="hover:text-primary absolute top-0 right-0 mt-2 mr-3 text-gray-400"
                >
                  <FaSearch />
                </button>
              </form>

              <div className="flex space-x-4">
                <Link
                  to="/gio-hang"
                  className="text-textColor hover:text-primary flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaShoppingCart size={20} />
                  <span>Giỏ hàng ({totalItems})</span>
                </Link>
              </div>

              {user ? (
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="mb-2 flex items-center space-x-2">
                    <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/tai-khoan"
                    className="text-textColor hover:text-primary flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserCircle size={20} />
                    <span>Thông tin tài khoản</span>
                  </Link>
                  <Link
                    to="/don-hang"
                    className="text-textColor hover:text-primary flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaShoppingCart size={20} />
                    <span>Đơn hàng của tôi</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center space-x-2 text-left text-red-600 hover:text-red-700"
                  >
                    <FaSignOutAlt size={20} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/dang-nhap"
                  className="text-textColor hover:text-primary flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser size={20} />
                  <span>Đăng nhập</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

// Component cho danh mục desktop
interface CategoryItemProps {
  category: Category
  onClose: () => void
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onClose }) => {
  const [isHovered, setIsHovered] = useState(false)
  const hasSubCategories = category.subCategories && category.subCategories.length > 0

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/san-pham/${category.slug}`}
        className="text-textColor hover:bg-primary flex w-full items-center justify-between px-4 py-2 text-sm hover:text-white"
        onClick={onClose}
      >
        <span>{category.name}</span>
        {hasSubCategories && (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        )}
      </Link>

      {hasSubCategories && isHovered && (
        <div className="absolute top-0 left-full z-10 ml-0.5 w-48 rounded-md bg-white py-1 shadow-lg">
          {(category.subCategories ?? []).map((subCategory: Category) => (
            <CategoryItem key={subCategory.id} category={subCategory} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  )
}

// Component cho danh mục trên mobile
interface MobileCategoryItemProps {
  category: Category
  onClick: () => void
  level: number
}

const MobileCategoryItem: React.FC<MobileCategoryItemProps> = ({ category, onClick, level }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubCategories = category.subCategories && category.subCategories.length > 0

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Link
          to={`/san-pham/${category.slug}`}
          className={`text-textColor hover:text-primary ${level > 0 ? 'ml-4 text-sm' : 'font-medium'}`}
          onClick={onClick}
        >
          {category.name}
        </Link>
        {hasSubCategories && (
          <button
            className="p-1 text-gray-500"
            onClick={(e) => {
              e.preventDefault()
              setIsOpen(!isOpen)
            }}
          >
            <svg
              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180 transform' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        )}
      </div>

      {isOpen && hasSubCategories && (
        <div className="space-y-2 pl-4">
          {(category.subCategories ?? []).map((subCategory: Category) => (
            <MobileCategoryItem
              key={subCategory.id}
              category={subCategory}
              onClick={onClick}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Header
