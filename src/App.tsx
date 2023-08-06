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
import Axios from 'axios'
import { stage } from './configs/stage'
import { configure } from 'axios-hooks'
import { AllTables } from './pages/all-tables'

const getJWT = () => {
  const userString = localStorage.getItem('user')
  const jwt = userString ? JSON.parse(userString)?.token : null
  return jwt
}

export const axios = Axios.create({
  baseURL: stage,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

configure({ axios })

axios.interceptors.request.use(
  (config) => {
    const token = getJWT()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

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
          path: '/tables',
          element: (
            <RouteGuard>
              <AllTables />
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
