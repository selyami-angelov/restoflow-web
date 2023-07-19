import { FormEventHandler } from 'react'

export interface InputProps {
  value: string
  error?: string
  onInput: FormEventHandler<HTMLInputElement>
}
