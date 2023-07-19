import { API_ENDPOINTS } from '../../common/api-endpoints'
import { OrderCard } from '../../components/cards/order-card'
import { useGet } from '../../hooks/use-get'
import { Order, Product } from '../models'

export const Orders = () => {
  const { data, loading, error } = useGet<Order[]>({ url: API_ENDPOINTS.ORDERS })
  const { data: productsData } = useGet<Product[]>({ url: API_ENDPOINTS.PRODUCTS })

  console.log(data)

  return (
    <div>
      {data?.map((order) => (
        <OrderCard key={order.id} {...order} product={productsData?.find((p) => p.id === order.productId)} />
      ))}
    </div>
  )
}
