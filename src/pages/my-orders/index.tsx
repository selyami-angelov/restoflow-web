import { API_ENDPOINTS } from '../../common/api-endpoints'
import { MyOrderCard } from '../../components/cards/my-order-card'
import { useGet } from '../../hooks/use-get'
import { Order, Product } from '../models'

export const MyOrders = () => {
  const { data: myOrders } = useGet<Order[]>({ url: API_ENDPOINTS.MY_ORDERS })
  const { data: products } = useGet<Product[]>({ url: API_ENDPOINTS.PRODUCTS })

  console.log('my orders', myOrders)
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {myOrders?.map((order) => (
        <MyOrderCard key={order.id} {...order} product={products?.find((p) => p.id === order.productId)} />
      ))}
    </div>
  )
}
