export interface Category {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  parentId?: string // Optional property for parent category
  subCategories?: Category[] // Optional property for subcategories
}

export interface CategoryFlat {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  parentId?: string
  createdOn?: string | null
  updatedOn?: string | null
}

export interface CategoryRequest {
  name: string
  description?: string
  imageUrl: string
  parentId?: string
}

export interface CategoryFilterParams {
  search?: string | null
}
