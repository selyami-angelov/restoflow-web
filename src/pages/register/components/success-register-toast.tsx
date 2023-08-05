import useAxios from 'axios-hooks'
import { Button, Toast } from 'flowbite-react'
import { MouseEventHandler, useContext, useEffect, useState } from 'react'

import { HiCheck } from '../../../components/icons/hi-check'
import { AuthFormButton } from '../../../components/buttons/auth-form-button'
import { API_ENDPOINTS } from '../../../common/api-endpoints'
import { LoginFormProps } from '../../models'
import { ERROR_MESSAGES } from '../../../common/constants'
import { AuthResponseError } from '../../../components/allerts/auth-response-error'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { SmallSpinner } from '../../../components/spinners/small-spinner'

interface Props {
  show: boolean
  loginData: LoginFormProps
}

export const SuccessRegisterToast = ({ loginData, show }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [responseError, setResponseError] = useState('')
  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)
  const [{ data, error, loading }, executePost] = useAxios(
    {
      url: API_ENDPOINTS.LOGIN,
      method: 'POST',
    },
    { manual: true }
  )

  useEffect(() => {
    if (show) {
      setIsOpen(true)
    }
  }, [show])

  const closeToast = () => {
    setIsOpen(false)
  }

  const onSignInClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    executePost({
      data: loginData,
    })
  }

  useEffect(() => {
    if (data) {
      dispatch({ type: 'LOGIN', payload: data })
      navigate('/')
    }
  }, [data, dispatch, navigate])

  useEffect(() => {
    if (error?.response) {
      setResponseError(ERROR_MESSAGES.GENERIC)
    }
  }, [error])

  return (
    <div
      className={`toast-top-right fixed top-32 right-5 transition-opacity duration-700 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Toast>
        <div className="flex items-start">
          <HiCheck />
          <div className="ml-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Registration successful</span>
            <div className="mb-2 text-sm font-normal">
              Thank you for registering. You can now login with your credentials.
            </div>
            <div className="flex-start flex gap-2">
              <div className="w-full">
                <AuthFormButton
                  size={'xs'}
                  text="Sign in"
                  onClick={onSignInClick}
                  loading={loading}
                  spinner={<SmallSpinner />}
                />
              </div>
              <div className="w-full">
                <Button onClick={closeToast} color="light" size="xs">
                  <p>Not now</p>
                </Button>
              </div>
            </div>
          </div>
          <Toast.Toggle onClick={closeToast} />
        </div>
        {responseError && <AuthResponseError error={responseError} />}
      </Toast>
    </div>
  )
}
