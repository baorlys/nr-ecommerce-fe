import { useState } from 'react'
import { Category } from '../../types/category'
import { Link } from 'react-router-dom'

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
          to={`/products/${category.slug}`}
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

export default MobileCategoryItem
