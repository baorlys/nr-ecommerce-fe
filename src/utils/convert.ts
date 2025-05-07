import { Category, CategoryFlat } from '../types/category'

export const flattenCategories = (categories: Category[]): CategoryFlat[] => {
  const result: CategoryFlat[] = []

  const traverse = (category: Category) => {
    const flat: CategoryFlat = {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      imageUrl: category.imageUrl,
      parentId: category.parentId,
    }
    result.push(flat)

    if (category.subCategories && category.subCategories.length > 0) {
      for (const sub of category.subCategories) {
        traverse({ ...sub, parentId: category.id }) // Set parentId explicitly
      }
    }
  }

  for (const cat of categories) {
    traverse(cat)
  }

  return result
}
