export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  parentId: string | null // Use string | null to allow for no parent category
  subCategories?: Category[] // Optional property for subcategories
}
