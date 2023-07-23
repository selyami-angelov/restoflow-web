import { ChangeEventHandler, useRef, useState } from 'react'
import { HiSearch } from 'react-icons/hi'

interface Props {
  filterTables: (search: string) => void
}

export const SearchIput = ({ filterTables }: Props) => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const hanedleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    const value = event.target.value
    setValue(value)
    filterTables(value)

    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    })
  }

  return (
    <div className="p-3">
      <label htmlFor="input-group-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <HiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          autoFocus
          ref={inputRef}
          key={'search-input'}
          onInput={hanedleInputChange}
          value={value}
          type="text"
          id="input-group-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search table"
        />
      </div>
    </div>
  )
}
