import Axios from 'axios'
import ReactDOM from 'react-dom/client'
import { Flowbite } from 'flowbite-react'
import { configure } from 'axios-hooks'
import { AuthContextProvider } from './context/AuthContext'
import { stage } from './configs/stage'
import { App } from './App'
import './index.css'

const getJWT = () => {
  const userString = localStorage.getItem('user')
  const jwt = userString ? JSON.parse(userString)?.token : null
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Flowbite>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Flowbite>
)
