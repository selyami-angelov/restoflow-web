import { AuthAction, AuthState } from './AuthContext'

const AuthReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        currentUser: action.payload,
      }
    }
    case 'LOGOUT': {
      return {
        currentUser: null,
      }
    }
    default:
      return state
  }
}

export default AuthReducer
