import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { Category } from '../../types/category'

interface CategoryCardProps {
  category: Category
}

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/products/${category.slug}`}>
      <div className="group relative overflow-hidden rounded-lg">
        <div className="h-40 overflow-hidden">
          <img
            src={category.imageUrl || '/placeholder.svg'}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-lg font-bold text-white">{category.name}</h3>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard
