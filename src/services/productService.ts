import { products } from '../mock'

import { ProductFilterParams } from '../types/product'

// API functions
export const fetchProductsApi = async (params: ProductFilterParams) => {
  try {
    // Trong môi trường thực tế, sẽ gọi API
    // const response = await api.get('/products', { params });
    // return response.data;

    // Trong môi trường development, sử dụng mock data
    let filteredProducts = [...products]

    // Apply search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) => product.name.toLowerCase().includes(searchTerm),
        // ||
        //   product.description.toLowerCase().includes(searchTerm),
      )
    }

    // Apply price filter
    if (params.minPrice !== undefined && params.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= (params.minPrice ?? 0) && product.price <= (params.maxPrice ?? Infinity),
      )
    }

    // Apply sorting
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case 'newest':
        default:
          // Assume newest is the default order in mock data
          break
      }
    }

    return filteredProducts
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products'
    throw new Error(errorMessage)
  }
}

export const fetchProductByIdApi = async (id: string) => {
  try {
    // Trong môi trường thực tế, sẽ gọi API
    // const response = await api.get(`/products/${id}`);
    // return response.data;

    // Trong môi trường development, sử dụng mock data
    const product = products.find((p) => p.id === id)

    if (!product) {
      throw new Error('Không tìm thấy sản phẩm')
    }

    return product
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product by ID'
    throw new Error(errorMessage)
  }
}

export const fetchProductsByCategoryApi = async (categoryId: string) => {
  try {
    // Trong môi trường thực tế, sẽ gọi API
    // const response = await api.get(`/products/category/${categoryId}`);
    // return response.data;

    // Trong môi trường development, sử dụng mock data
    // const filteredProducts = products.filter((p) => p.categorySlug === categoryId)
    const filteredProducts = products

    return filteredProducts
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products'
    throw new Error(errorMessage)
  }
}

export const fetchFeaturedProductsApi = async () => {
  try {
    // Trong môi trường thực tế, sẽ gọi API
    // const response = await api.get('/products/featured');
    // return response.data;

    // Trong môi trường development, sử dụng mock data
    // const featuredProducts = products.filter((p) => p.isFeatured)
    const featuredProducts = products

    return featuredProducts
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch featured products'
    throw new Error(errorMessage)
  }
}
