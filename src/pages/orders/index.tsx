import { MouseEventHandler, useState } from 'react'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { OrderCard } from '../../components/cards/order-card'
import { useGet } from '../../hooks/use-get'
import { Category, Order } from '../models'
import { Clock } from '../../components/clock'
import '../../App.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const Orders = () => {
  const [categoryOrders, setCategoryOrders] = useState<Order[]>([])
  const { data: allOrders } = useGet<Order[]>({ url: API_ENDPOINTS.ORDERS })
  const { data: categories } = useGet<Category[]>({ url: API_ENDPOINTS.CATEGORY })

  const handleCategoryClick: MouseEventHandler<HTMLLIElement> = (event) => {
    if (allOrders) {
      const categoryName = event.currentTarget.textContent
      if (categoryName === 'All') {
        setCategoryOrders(allOrders)
      } else {
        const catOrders = allOrders?.filter((o) => o.product?.categoryName === categoryName)
        setCategoryOrders(catOrders)
      }
    }
  }

  return (
    <div className="w-full relative">
      <p className="m-10 mt-5 text-3xl font-bold font-playfair italic text-gray-600/90 dark:text-white/90">Orders</p>
      <div className="fixed top-24 right-10 ">
        <Clock />
      </div>
      <ul className="flex flex-row justify-center font-medium  mr-6 space-x-8 text-sm  mb-10">
        <li key={'all'} onClick={handleCategoryClick}>
          <a className="text-gray-950 dark:text-white hover:underline hover:cursor-pointer">All</a>
        </li>

        {categories?.map((c) => (
          <li key={c.id} onClick={handleCategoryClick}>
            <a className="text-gray-950 dark:text-white hover:underline hover:cursor-pointer">{c.name}</a>
          </li>
        ))}
      </ul>
      <div>
        <TransitionGroup component={null}>
          {categoryOrders?.map((order) => (
            <CSSTransition key={order.id} timeout={500} classNames="fade">
              <OrderCard {...order} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}
