import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import jwtDecode from 'jwt-decode'

export const useUserDetails = () => {
  const [user, setUser] = useState({ roles: [] as string[], firstName: '', lastName: '', email: '' })
  const { state } = useContext(AuthContext)

  useEffect(() => {
    if (state?.currentUser) {
      const { token, email, firstName, lastName } = state.currentUser
      const decodedToken = jwtDecode<Record<string, unknown>>(token)
      let roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as string[]
      roles = Array.isArray(roles) ? roles : [roles]

      setUser({ roles, email, firstName, lastName })
    }
  }, [state])

  return user
}
