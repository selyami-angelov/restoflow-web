import { useState } from 'react'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import ProductCard from '../../components/cards/product-card'
import { Product, Table } from '../models'
import { useGet } from '../../hooks/use-get'
import { OrderDetailsModal } from './order-details-modal'
import { axios } from '../../main'

export interface CreateOrderProps {
  productId: number
  productQuantity: number
  info: string
}

export const Products = () => {
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const { data: productsData } = useGet<Product[]>({ url: API_ENDPOINTS.PRODUCTS })
  const [loading, setLoading] = useState(false)

  const createOrder = async (data: CreateOrderProps) => {
    console.log('updated data', data)

    try {
      const response = await axios.post(API_ENDPOINTS.ORDERS, data)
      console.log(response.data)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const onCofirm = async (table: Table, data: CreateOrderProps) => {
    setLoading(true)
    try {
      const orderResponse = await createOrder(data)

      // assign order to table
      const endpoint = `/tables/${table.id}/orders/${orderResponse.data.id}`
      const assignTableResponse = await axios.post(endpoint)
      if (assignTableResponse.status === 200) {
        setLoading(false)
        closeTablesModal()
      }
      console.log('assignTableResponse', assignTableResponse)
    } catch (error) {
      console.error(error)
    }
  }

  const closeTablesModal = () => {
    setIsOpenOrderDetails(false)
    setSelectedProduct(undefined)
  }
  const openTablesModal = () => {
    setIsOpenOrderDetails(true)
  }

  const openOrderDetailsModal = (product: Product) => {
    setSelectedProduct(product)
    openTablesModal()
  }

  console.log('products', productsData)
  return (
    <div className="container mx-auto ">
      <div className="flex justify-center flex-wrap gap-4">
        {productsData?.map((product) => (
          <ProductCard key={product.id} {...product} handleCreateOrderClick={openOrderDetailsModal} />
        ))}
      </div>
      <OrderDetailsModal
        closeTablesModal={closeTablesModal}
        onCofirm={onCofirm}
        isOpen={isOpenOrderDetails}
        loadingConfirm={loading}
        selectedProduct={selectedProduct}
      />
    </div>
  )
}
