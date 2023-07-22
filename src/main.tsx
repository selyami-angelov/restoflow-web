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
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB44NkSbhsjYT0V9Z_QjV7TwEVcx__RXho',
  authDomain: 'resto-flow-web.firebaseapp.com',
  projectId: 'resto-flow-web',
  storageBucket: 'resto-flow-web.appspot.com',
  messagingSenderId: '930928903926',
  appId: '1:930928903926:web:a8ea7609fb8d51dadfced7',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const getJWT = () => {
  const userString = localStorage.getItem('user')
  const jwt = userString ? JSON.parse(userString)?.token : null

  console.log('jwt', userString)
  return jwt
}

let stage

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  stage = 'https://localhost:44329/api/'
} else {
  stage = 'https://resto-flow-api.azurewebsites.net/api/'
}

const jwt = getJWT()

export const axios = Axios.create({
  baseURL: 'https://localhost:44329/api/',
  headers: {
    Authorization: jwt ? `Bearer ${getJWT()}` : null,
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
