import useAxios from 'axios-hooks'
import { Link, useNavigate } from 'react-router-dom'
import { FormEventHandler, MouseEventHandler, useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../context/AuthContext'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { isValidEmail } from '../../utils/email-validation'
import { DEFAULT_STATES, ERROR_MESSAGES, VALIDATION_MESSAGES } from '../../common/constants'
import { AuthFormHeader } from '../../components/form/auth-form-header'
import { EmailInput } from '../../components/form/email-input'
import { PasswordInput } from '../../components/form/password-input'
import { AuthFormButton } from '../../components/buttons/auth-form-button'
import { AuthResponseError } from '../../components/allerts/auth-response-error'
import { LoginErrorsProps, LoginFormProps } from '../models'

export const Login = () => {
  const [formData, setFormData] = useState<LoginFormProps>(DEFAULT_STATES.LOGIN_FORM)
  const [errors, setErrors] = useState<LoginErrorsProps>(DEFAULT_STATES.LOGIN_ERRORS)
  const [responseError, setResponseError] = useState('')
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const [{ data, error, loading }, executePost] = useAxios(
    {
      url: API_ENDPOINTS.LOGIN,
      method: 'POST',
    },
    { manual: true }
  )

  const onInput: FormEventHandler<HTMLInputElement> = (event) => {
    const key = event.currentTarget.name.trim() as keyof LoginFormProps
    const value = event.currentTarget.value.trim()
    setErrors((prevState) => ({ ...prevState, [key]: '' }))
    setResponseError('')
    setFormData((prevState) => ({ ...prevState, [key]: value }))
  }

  const handleLoginClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    const validationErrors = { ...DEFAULT_STATES.LOGIN_ERRORS }
    if (!formData.email) {
      validationErrors.email = VALIDATION_MESSAGES.EMAIL
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = VALIDATION_MESSAGES.EMAIL_REGEX
    }
    if (!formData.password) {
      validationErrors.password = VALIDATION_MESSAGES.PASSWORD
    }

    setErrors(validationErrors)
    if (!validationErrors.email && !validationErrors.password) {
      const postData = {
        email: formData.email,
        password: formData.password,
      }
      executePost({
        data: postData,
      })
    }
  }

  useEffect(() => {
    if (data) {
      dispatch({ type: 'LOGIN', payload: data })
      navigate('/')
    }
  }, [data, dispatch])

  useEffect(() => {
    if (error?.response && error?.response?.status === 400) {
      setResponseError(ERROR_MESSAGES.LOGIN)
    }
  }, [error])

  return (
    <section className="bg-gray-50 dark:bg-gray-800 h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <AuthFormHeader />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <EmailInput value={formData?.email} error={errors.email} onInput={onInput} />
              <PasswordInput id="password" value={formData?.password} error={errors?.password} onInput={onInput} />
              <AuthFormButton
                text={'Sign in'}
                onClick={handleLoginClick}
                loading={loading}
                disabled={Boolean(errors?.email || errors.password)}
              />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </Link>
              </p>
            </form>
            {responseError && <AuthResponseError error={responseError} />}
          </div>
        </div>
      </div>
    </section>
  )
}
