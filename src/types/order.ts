export interface Order {
    id: string
    userId: string
    items: OrderItem[]
    shippingAddress: ShippingAddress
    paymentMethod: string
    paymentStatus: "pending" | "paid" | "failed"
    shippingMethod: string
    shippingFee: number
    subtotal: number
    total: number
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    notes?: string
    createdAt: string
    updatedAt: string
  }
  
  export interface OrderItem {
    id: string
    name: string
    price: number
    image: string
    quantity: number
  }
  
  export interface ShippingAddress {
    fullName: string
    phone: string
    email: string
    address: string
    city: string
    district: string
    ward: string
  }
  