import type { User } from '../types/user'

// Mock data cho người dùng
export const users: User[] = [
  {
    id: '1',
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    email: 'user@example.com',
    password: 'password', // Trong thực tế, mật khẩu sẽ được mã hóa
    role: 'customer',
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-01-15T08:30:00Z',
    phone: '0123456789',
    address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
    avatar: 'https://placehold.co/200x200/E53935/FFFFFF?text=NA',
  },
  {
    id: '2',
    firstName: 'Trần',
    lastName: 'Thị B',
    email: 'admin@example.com',
    password: 'admin123', // Trong thực tế, mật khẩu sẽ được mã hóa
    role: 'admin',
    createdAt: '2023-01-10T10:15:00Z',
    updatedAt: '2023-01-10T10:15:00Z',
    phone: '0987654321',
    address: '456 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    avatar: 'https://placehold.co/200x200/FBC02D/212121?text=TB',
  },
]
