import { useState } from 'react'
import { Category } from '../../types/category'
import { Link } from 'react-router-dom'

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
        to={`/products/${category.slug}`}
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

export default CategoryItem
