import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from 'react'
import AuthReducer from './AuthReducer'

interface Props {
  children: ReactNode | ReactNode[]
}

export interface AuthState {
  currentUser: string
}

export interface AuthAction {
  type: string
  payload?: any
}

const getUserFromLocaStorage = () => {
  const userString = localStorage.getItem('user')
  return userString ? JSON.parse(userString) : null
}

const INITIAL_STATE: AuthState = {
  currentUser: getUserFromLocaStorage(),
}

export const AuthContext = createContext<{
  state: AuthState
  dispatch: Dispatch<AuthAction>
}>({ state: INITIAL_STATE, dispatch: () => 0 })

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.currentUser))
  }, [state.currentUser])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
