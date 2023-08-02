import { Link } from 'react-router-dom'
import useAxios from 'axios-hooks'
import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react'

import { NameInput } from '../../components/form/name-input'
import { DEFAULT_STATES, ERROR_MESSAGES, VALIDATIONS, VALIDATION_MESSAGES } from '../../common/constants'
import { LoginFormProps, RegisterErrorsProps, RegisterFormProps } from '../models'
import { EmailInput } from '../../components/form/email-input'
import { PasswordInput } from '../../components/form/password-input'
import { AuthFormButton } from '../../components/buttons/auth-form-button'
import { isValidEmail } from '../../utils/email-validation'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { AuthResponseError } from '../../components/allerts/auth-response-error'
import { AuthFormHeader } from '../../components/form/auth-form-header'
import { SuccessRegisterToast } from './components/success-register-toast'

export const Register = () => {
  const [formData, setFormData] = useState<RegisterFormProps>(DEFAULT_STATES.REGISTER_FORM)
  const [errors, setErrors] = useState<RegisterErrorsProps>(DEFAULT_STATES.REGISTER_ERRORS)
  const [responseError, setResponseError] = useState('')
  const [showSuccesToast, setShowSuccessToast] = useState(false)
  const [loginData, setLoginData] = useState<LoginFormProps>(DEFAULT_STATES.LOGIN_FORM)
  const [{ data, error, loading }, executePost] = useAxios(
    {
      url: API_ENDPOINTS.REGISTER,
      method: 'POST',
    },
    { manual: true }
  )

  const onInput: FormEventHandler<HTMLInputElement> = (event) => {
    const key = event.currentTarget.name.trim() as keyof RegisterFormProps
    const value = event.currentTarget.value.trim()
    setErrors((prevState) => ({ ...prevState, [key]: '' }))
    setResponseError('')
    setFormData((prevState) => ({ ...prevState, [key]: value }))
  }

  const isAnyValidationErrors = (errors: RegisterErrorsProps) =>
    Boolean(
      errors.email ||
        errors.password ||
        errors.firstName ||
        errors.lastName ||
        errors.password ||
        errors.confirmPassword
    )

  const handleRegisterClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    const validationErrors = { ...DEFAULT_STATES.REGISTER_ERRORS }

    if (!formData.firstName) {
      validationErrors.firstName = VALIDATION_MESSAGES.FIRST_NAME
    } else if (
      formData.firstName.length < VALIDATIONS.REGISTER_FORM.FIRST_NAME_MIN_LENGTH ||
      formData.firstName.length > VALIDATIONS.REGISTER_FORM.FIRST_NAME_MAX_LENGTH
    ) {
      validationErrors.firstName = VALIDATION_MESSAGES.FIRST_NAME_LENGTH
    }
    if (!formData.lastName) {
      validationErrors.lastName = VALIDATION_MESSAGES.LAST_NAME
    } else if (
      formData.lastName.length < VALIDATIONS.REGISTER_FORM.LAST_NAME_MIN_LENGTH ||
      formData.lastName.length > VALIDATIONS.REGISTER_FORM.LAST_NAME_MAX_LENGTH
    ) {
      validationErrors.lastName = VALIDATION_MESSAGES.LAST_NAME_LENGTH
    }
    if (!formData.email) {
      validationErrors.email = VALIDATION_MESSAGES.EMAIL
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = VALIDATION_MESSAGES.EMAIL_REGEX
    }
    if (!formData.password) {
      validationErrors.password = VALIDATION_MESSAGES.PASSWORD
    }
    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = VALIDATION_MESSAGES.PASSWORD_CONFIRM
    } else if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = VALIDATION_MESSAGES.PASSWORD_NOT_MATCH
    }

    setErrors(validationErrors)

    if (isAnyValidationErrors(validationErrors)) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...postData } = formData
    executePost({
      data: postData,
    })
  }

  useEffect(() => {
    if (data?.message === 'Registration successful' && formData?.email) {
      setShowSuccessToast(true)
      setFormData(DEFAULT_STATES.REGISTER_FORM)
      setLoginData({ email: formData.email, password: formData.password })
    }
  }, [data, formData])

  useEffect(() => {
    if (error?.response) {
      setResponseError(ERROR_MESSAGES.REGISTRATION)
    }
  }, [error])

  return (
    <section className="bg-gray-50 dark:bg-gray-800 h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <AuthFormHeader />
        <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <NameInput
                id={'firstName'}
                label="Your First Name"
                onInput={onInput}
                placeholder={'Enter your first name'}
                value={formData?.firstName}
                error={errors?.firstName}
              />
              <NameInput
                id={'lastName'}
                label="Your Last Name"
                onInput={onInput}
                placeholder={'Enter your last name'}
                value={formData?.lastName}
                error={errors?.lastName}
              />
              <EmailInput value={formData?.email} onInput={onInput} error={errors?.email} />
              <PasswordInput id={'password'} value={formData?.password} onInput={onInput} error={errors?.password} />
              <PasswordInput
                id={'confirmPassword'}
                value={formData?.confirmPassword}
                onInput={onInput}
                error={errors?.confirmPassword}
              />
              <AuthFormButton
                text={'Sign up'}
                onClick={handleRegisterClick}
                loading={loading}
                disabled={isAnyValidationErrors(errors)}
              />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Login here
                </Link>
              </p>
            </form>
            {responseError && <AuthResponseError error={responseError} />}
          </div>
        </div>
      </div>
      <SuccessRegisterToast show={showSuccesToast} loginData={loginData} />
    </section>
  )
}
