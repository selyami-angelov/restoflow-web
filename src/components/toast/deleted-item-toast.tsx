import { Toast } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiX } from 'react-icons/hi'

interface Props {
  duration: number
}

export const DeletedItemToast = ({ duration }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)

    const timer = setTimeout(() => {
      setIsOpen(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  return (
    <Toast
      className={`toast-top-right fixed top-36 right-10 transition-opacity duration-700 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <HiX className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">Item has been deleted.</div>
    </Toast>
  )
}
