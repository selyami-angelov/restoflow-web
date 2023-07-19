import { InputProps } from './models'

interface Props extends InputProps {
  id: 'password' | 'confirmPassword'
}

export const PasswordInput = ({ value, error, id, onInput }: Props) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {id === 'password' ? 'Password' : 'Confirm Password'}
      </label>
      <input
        value={value}
        onInput={onInput}
        type={'password'}
        name={id}
        id={id}
        placeholder="••••••••"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
