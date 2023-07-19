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
import { Products } from './pages/products'
import { Orders } from './pages/orders'
import { MyOrders } from './pages/my-orders'
import { CreateProduct } from './components/form/create-product'
import './index.css'
import { EditProduct } from './components/form/edit-product'
import { MyTables } from './pages/my-tables'
import { MyBills } from './pages/my-bills'
import { AllBills } from './pages/all-bills'

const getJWT = () => {
  const userString = localStorage.getItem('user')
  const jwt = userString ? JSON.parse(userString)?.token : null

  console.log('jwt', userString)
  return jwt
}

export const axios = Axios.create({
  baseURL: 'https://resto-flow-api.azurewebsites.net/api/',
  headers: {
    Authorization: `Bearer ${getJWT()}`,
    'Content-Type': 'application/json',
  },
})
configure({ axios })

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/my-orders',
        element: <MyOrders />,
      },
      {
        path: '/my-tables',
        element: <MyTables />,
      },
      {
        path: '/create-product',
        element: <CreateProduct />,
      },
      {
        path: '/edit-product',
        element: <EditProduct />,
      },
      {
        path: '/my-bills',
        element: <MyBills />,
      },
      {
        path: '/all-bills',
        element: <AllBills />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Flowbite>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </Flowbite>
)
