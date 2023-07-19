export interface LoginFormProps {
  email: string
  password: string
}

export interface RegisterFormProps extends LoginFormProps {
  firstName: string
  lastName: string
  confirmPassword: string
}

export type LoginErrorsProps = Partial<LoginFormProps>
export type RegisterErrorsProps = Partial<RegisterFormProps>

export interface Product {
  id: number
  name: string
  description: string
  categoryId: number
  categoryName: string
  price: string
  img: string
}

export interface Table {
  id: number
  tableNumber: number
  seats: number
}

export interface OccupiedTables {
  tableId: number
  userName: string
}

export interface Order {
  createdBy: string
  createdById: string
  createdDate: string
  id: number
  info: string
  isServed: boolean
  isReady: boolean
  productId: number
  productQuantity: number
  product?: Product
  editedBy?: string
  editedById?: string
  editedDate?: string
}

export interface Category {
  id: number
  name: string
  isDeleted: boolean
}

export interface Bill {
  date: string
  id: number
  orders: Partial<Order>[]
  productQuantity: number
  tableId: number
  tableNumber: number
  totalSum: number
  userId: string
  user: string
}
