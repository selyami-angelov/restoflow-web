import { Button, ButtonSizes } from 'flowbite-react'
import { MouseEventHandler, ReactNode } from 'react'

interface Props {
  text: 'Sign in' | 'Sign up'
  onClick: MouseEventHandler<HTMLButtonElement>
  size?: keyof ButtonSizes
  loading?: boolean
  disabled?: boolean
  spinner?: ReactNode
}
export const AuthFormButton = ({ text, loading, disabled, onClick, size, spinner }: Props) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      isProcessing={loading}
      processingSpinner={spinner}
      size={size}
      className={`w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <p>{text}</p>
    </Button>
  )
}
