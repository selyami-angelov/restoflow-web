import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Root } from './pages/root'
import { Home } from './pages/home'
import RouteGuard from './components/route-guard'
import { Menu } from './pages/menu'
import { Orders } from './pages/orders'
import { MyOrders } from './pages/my-orders'
import { MyTables } from './pages/my-tables'
import { MyBills } from './pages/my-bills'
import { AllBills } from './pages/all-bills'
import { Login } from './pages/login'
import { Register } from './pages/register'

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/menu',
          element: (
            <RouteGuard>
              <Menu />
            </RouteGuard>
          ),
        },
        {
          path: '/orders',
          element: (
            <RouteGuard>
              <Orders />
            </RouteGuard>
          ),
        },
        {
          path: '/my-orders',
          element: (
            <RouteGuard>
              <MyOrders />
            </RouteGuard>
          ),
        },
        {
          path: '/my-tables',
          element: (
            <RouteGuard>
              <MyTables />
            </RouteGuard>
          ),
        },
        {
          path: '/my-bills',
          element: (
            <RouteGuard>
              <MyBills />
            </RouteGuard>
          ),
        },
        {
          path: '/all-bills',
          element: (
            <RouteGuard>
              <AllBills />
            </RouteGuard>
          ),
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
