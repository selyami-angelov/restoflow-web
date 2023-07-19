import { AuthAction, AuthState } from './AuthContext'

const AuthReducer = (state: AuthState, action: AuthAction) => {
  console.log('action.type', action.type)
  console.log('action.payload', action.payload)

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
