import { ReactNode, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

interface Props {
  children: ReactNode
}

const RouteGuard = ({ children }: Props) => {
  const { state } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.currentUser) {
      navigate('/login')
    }
  }, [state.currentUser, navigate])

  return state.currentUser ? children : <Link to={'/'} />
}

export default RouteGuard
