import { MouseEventHandler, useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { MyOrderCard } from '../../components/cards/my-order-card'
import { useGet } from '../../hooks/use-get'
import { Category, Order } from '../models'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const MyOrders = () => {
  const { data: allOrders, getData: getOrders } = useGet<Order[]>({ url: API_ENDPOINTS.MY_ORDERS })
  const { data: categories } = useGet<Category[]>({ url: API_ENDPOINTS.CATEGORY })
  const [categoryOrders, setCategoryOrders] = useState<Order[]>(allOrders ?? [])

  useEffect(() => {
    getOrders(API_ENDPOINTS.MY_ORDERS)
  }, [])

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

  console.log(categoryOrders)

  return (
    <>
      <p className="m-10 text-3xl font-bold font-playfair italic text-gray-600/90 dark:text-white/90">My Orders</p>
      <ul className="flex flex-row justify-center font-medium mt-0 mr-6 space-x-8 text-sm">
        <li key={'all'} onClick={handleCategoryClick} className="mb-10">
          <a className="text-gray-950 dark:text-white hover:underline hover:cursor-pointer">All</a>
        </li>
        {categories?.map((c) => (
          <li key={c.id} onClick={handleCategoryClick} className="mb-10">
            <a className="text-gray-950 dark:text-white hover:underline hover:cursor-pointer">{c.name}</a>
          </li>
        ))}
      </ul>
      <div className="flex flex-row flex-wrap justify-center gap-4">
        <TransitionGroup component={null}>
          {categoryOrders?.map((order) => (
            <CSSTransition key={order.id} timeout={500} classNames="fade">
              <MyOrderCard key={order.id} {...order} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </>
  )
}
