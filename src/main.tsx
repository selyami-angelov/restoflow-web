import Axios from 'axios'
import ReactDOM from 'react-dom/client'
import { Flowbite } from 'flowbite-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/login'
import { Root } from './pages/root'
import { Home } from './pages/home'
import { Register } from './pages/register'
import { configure } from 'axios-hooks'
import { AuthContextProvider } from './context/AuthContext'
import { Orders } from './pages/orders'
import { MyOrders } from './pages/my-orders'
import './index.css'
import { MyTables } from './pages/my-tables'
import { MyBills } from './pages/my-bills'
import { AllBills } from './pages/all-bills'
import { stage } from './configs/stage'
import { Menu } from './pages/menu'
import RouteGuard from './components/route-guard'

const getJWT = () => {
  const userString = localStorage.getItem('user')
  const jwt = userString ? JSON.parse(userString)?.token : null

  console.log('jwt', userString)
  return jwt
}

const jwt = getJWT()

export const axios = Axios.create({
  baseURL: stage,
  headers: {
    'Content-Type': 'application/json',
    ...(jwt && { Authorization: `Bearer ${jwt}` }), // Conditionally add the header if the token is not null
  },
})
configure({ axios })

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Flowbite>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </Flowbite>
)
