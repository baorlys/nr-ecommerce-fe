export interface Category {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  subCategories?: Category[] // Optional property for subcategories
}
