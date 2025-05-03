// Hàm định dạng tiền tệ
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN') + 'đ'
}

// Hàm định dạng ngày tháng
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Hàm định dạng ngày tháng và giờ
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
