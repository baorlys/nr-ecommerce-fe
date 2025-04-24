import type { Category } from '../types/category'

// Mock data cho danh mục sản phẩm
export const categories: Category[] = [
  {
    id: '1',
    name: 'Các loại khô',
    slug: 'cac-loai-kho',
    description: 'Các loại khô thơm ngon, đậm đà hương vị.',
    imageUrl: 'https://placehold.co/600x400/E53935/FFFFFF?text=Các+loại+khô',
  },
  {
    id: '2',
    name: 'Cơm cháy',
    slug: 'com-chay',
    description: 'Các loại cơm cháy giòn rụm, thơm ngon.',
    imageUrl: 'https://placehold.co/600x400/FBC02D/212121?text=Cơm+cháy',
    subCategories: [
      {
        id: '2-1',
        name: 'Cơm cháy miếng lẻ',
        slug: 'com-chay-mieng-le',
        description: 'Cơm cháy miếng lẻ giòn rụm, thơm ngon.',
        imageUrl: 'https://placehold.co/600x400/FBC02D/212121?text=Cơm+cháy+miếng+lẻ',
      },
      {
        id: '2-2',
        name: 'Cơm cháy hộp',
        slug: 'com-chay-hop',
        description: 'Cơm cháy hộp giòn rụm, thơm ngon.',
        imageUrl: 'https://placehold.co/600x400/FBC02D/212121?text=Cơm+cháy+hộp',
      },
    ]
  },
  {
    id: '3',
    name: 'Đồ ăn vặt',
    slug: 'do-an-vat',
    description: 'Các loại đồ ăn vặt đa dạng, thơm ngon, kích thích vị giác.',
    imageUrl: 'https://placehold.co/600x400/FF7043/FFFFFF?text=Đồ+ăn+vặt',
    subCategories: [
      {
        id: '3-1',
        name: 'Mực rim me',
        slug: 'muc-rim-me',
        description: 'Mực rim me chua ngọt, thơm ngon.',
        imageUrl: 'https://placehold.co/600x400/FF7043/FFFFFF?text=Mực+rim+me',
      },
      {
        id: '3-2',
        name: 'Cơm cháy chà bông',
        slug: 'com-chay-cha-bong',
        description: 'Cơm cháy chà bông giòn rụm, thơm ngon.',
        imageUrl: 'https://placehold.co/600x400/FF7043/FFFFFF?text=Cơm+cháy+chà+bông',
      },
      {
        id: '3-3',
        name: 'Snack các loại',
        slug: 'snack-cac-loai',
        description: 'Các loại snack đa dạng, thơm ngon.',
        imageUrl: 'https://placehold.co/600x400/FF7043/FFFFFF?text=Snack+các+loại',
        subCategories: [
          {
            id: '3-3-1',
            name: 'Snack bắp',
            slug: 'snack-bap',
            description: 'Snack bắp giòn ngon.',
            imageUrl: 'https://placehold.co/600x400/FF7043/FFFFFF?text=Snack+bắp',
          },
          {
            id: '3-3-2',
            name: 'Snack khoai tây',
            slug: 'snack-khoai-tay',
            description: 'Snack khoai tây giòn ngon.',
            imageUrl: 'https://placehold.co/600x400/FF7043/FFFFFF?text=Snack+khoai+tây',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Đồ uống',
    slug: 'do-uong',
    description: 'Các loại đồ uống giải khát, thơm ngon, bổ dưỡng.',
    imageUrl: 'https://placehold.co/600x400/BA68C8/FFFFFF?text=Đồ+uống',
  },
]
