import type { ProductDetail } from '../types/product'

// Mock data cho sản phẩm
export const products: ProductDetail[] = [
  {
    id: '1',
    name: 'Khô gà lá chanh',
    slug: 'kho-ga-la-chanh',
    price: 75000,
    images: [
      'https://moderncook.com.vn/recipes/wp-content/uploads/2019/10/Kho%CC%82-ga%CC%80-la%CC%81-chanh-Large.jpeg',
      'https://placehold.co/600x600/FBC02D/212121?text=Khô+gà+lá+chanh+2',
      'https://placehold.co/600x600/FF7043/FFFFFF?text=Khô+gà+lá+chanh+3',
      'https://placehold.co/600x600/BA68C8/FFFFFF?text=Khô+gà+lá+chanh+4',
    ],
    categoryId: '1',
    categoryName: 'Khô gà',
    categorySlug: 'kho-ga',
    rating: 4.8,
    reviewCount: 120,
    isFeatured: true,
    isInStock: true,
    shortDescription:
      'Khô gà lá chanh thơm ngon, vị cay nhẹ, đậm đà hương vị đặc trưng của miền Tây Nam Bộ.',
    description:
      '<p>Khô gà lá chanh là món ăn vặt được yêu thích với hương vị đặc trưng của thịt gà kết hợp với lá chanh thơm nồng. Sản phẩm được chế biến từ thịt gà tươi ngon, tẩm ướp gia vị đặc biệt và sấy khô đến độ giòn vừa phải.</p><p>Khô gà có vị mặn ngọt vừa phải, cay nhẹ và thơm mùi lá chanh đặc trưng, kích thích vị giác. Đây là món ăn vặt lý tưởng cho các buổi xem phim, đi picnic hoặc nhâm nhi cùng bạn bè.</p>',
    reviews: [
      {
        id: '1',
        name: 'Nguyễn Văn A',
        rating: 5,
        date: '15/04/2023',
        comment: 'Khô gà rất ngon, vị vừa ăn, không quá mặn. Sẽ mua lại lần sau.',
      },
      {
        id: '2',
        name: 'Trần Thị B',
        rating: 4,
        date: '20/03/2023',
        comment: 'Giao hàng nhanh, đóng gói cẩn thận. Khô gà thơm, giòn, nhưng hơi cay.',
      },
      {
        id: '3',
        name: 'Lê Văn C',
        rating: 5,
        date: '05/02/2023',
        comment: 'Sản phẩm chất lượng, ăn rất ngon. Mình đã mua nhiều lần rồi.',
      },
    ],
    variants: [
      {
        id: '1',
        name: 'Khô gà lá chanh gói nhỏ',
        price: 75000,
        weight: 200,
        unit: 'gram',
        isInStock: false,
      },
      {
        id: '2',
        name: 'Khô gà lá chanh gói lớn',
        price: 140000,
        weight: 400,
        unit: 'gram',
        isInStock: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Khô gà cay',
    slug: 'kho-ga-cay',
    price: 80000,
    images: [
      'https://placehold.co/600x600/FF7043/FFFFFF?text=Khô+gà+cay',
      'https://placehold.co/600x600/E53935/FFFFFF?text=Khô+gà+cay+2',
      'https://placehold.co/600x600/FBC02D/212121?text=Khô+gà+cay+3',
    ],
    categoryId: '1',
    categoryName: 'Khô gà',
    categorySlug: 'kho-ga',
    rating: 4.5,
    reviewCount: 85,
    isFeatured: true,
    isInStock: true,
    shortDescription: 'Khô gà cay đậm đà, thơm ngon với vị cay nồng đặc trưng, kích thích vị giác.',
    description:
      '<p>Khô gà cay là phiên bản cay hơn của khô gà truyền thống, phù hợp với những người yêu thích vị cay. Sản phẩm được chế biến từ thịt gà tươi ngon, tẩm ướp gia vị đặc biệt với nhiều ớt và sấy khô đến độ giòn vừa phải.</p><p>Khô gà có vị mặn ngọt vừa phải, cay nồng và thơm mùi gia vị đặc trưng. Đây là món ăn vặt lý tưởng cho các buổi xem phim, đi picnic hoặc nhâm nhi cùng bạn bè.</p>',
    reviews: [
      {
        id: '1',
        name: 'Phạm Thị D',
        rating: 5,
        date: '10/04/2023',
        comment: 'Cay vừa phải, rất ngon. Sẽ mua lại.',
      },
      {
        id: '2',
        name: 'Hoàng Văn E',
        rating: 4,
        date: '15/03/2023',
        comment: 'Khô gà thơm, giòn, cay đúng vị. Giao hàng hơi chậm.',
      },
    ],
    variants: [
      {
        id: '1',
        name: 'Khô gà cay gói nhỏ',
        price: 80000,
        weight: 200,
        unit: 'gram',
        isInStock: true,
      },
      {
        id: '2',
        name: 'Khô gà cay gói lớn',
        price: 150000,
        weight: 400,
        unit: 'gram',
        isInStock: true,
      },
    ],
  },
  // Add more products with the same structure...
]
