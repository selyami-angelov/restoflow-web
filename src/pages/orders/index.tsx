import { API_ENDPOINTS } from '../../common/api-endpoints'
import { OrderCard } from '../../components/cards/order-card'
import { useGet } from '../../hooks/use-get'
import { Order } from '../models'

export const Orders = () => {
  const { data } = useGet<Order[]>({ url: API_ENDPOINTS.ORDERS })

  console.log(data)

  return (
    <div>
      {data?.map((order) => (
        <OrderCard key={order.id} {...order} />
      ))}
    </div>
  )
}
