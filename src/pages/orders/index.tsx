import { MouseEventHandler, useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { OrderCard } from '../../components/cards/order-card'
import { useGet } from '../../hooks/use-get'
import { Category, Order } from '../models'
import { Clock } from '../../components/clock'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import '../../App.css'
import { useNewOrderListener } from '../../hooks/signalr/use-new-order-listener'

export const Orders = () => {
  const { data: allOrders, getData } = useGet<Order[]>({ manual: true })
  const [categoryOrders, setCategoryOrders] = useState<Order[]>(allOrders ?? [])
  const { data: categories } = useGet<Category[]>({ url: API_ENDPOINTS.CATEGORY })
  const newOrder = useNewOrderListener()

  useEffect(() => {
    getData(API_ENDPOINTS.ORDERS)
  }, [])

  useEffect(() => {
    if (newOrder) {
      console.log('get orders on new order created')
      getData(API_ENDPOINTS.ORDERS)
    }
  }, [newOrder])

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

  useEffect(() => {
    if (allOrders) {
      setCategoryOrders(allOrders)
    }
  }, [allOrders])

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
          {categoryOrders
            ?.sort((o1, o2) => +new Date(o2.createdDate) - +new Date(o1.createdDate))
            .map((order) => (
              <CSSTransition key={order.id} timeout={500} classNames="fade">
                <OrderCard {...order} getOrders={() => getData(API_ENDPOINTS.ORDERS)} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </div>
  )
}
