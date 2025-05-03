export interface Category {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  subCategories?: Category[] // Optional property for subcategories
}

export interface CategoryFlat {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  parentId?: string
  createdOn: string
  updatedOn: string
}

export interface CategoryRequest {
  name: string
  description?: string
  imageUrl: string
  parentId?: string
}
