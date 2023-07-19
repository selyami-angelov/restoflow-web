import img from '../../../public/assets/burger.jpg'
import { GreenStatusDot } from '../dots/green-status-dot'
import { RedStatusDot } from '../dots/red-status-dot'

interface Props {
  name: string
  status?: 'Served' | 'In Progress...'
  quantity: number
  price: string
}

export const TableRow = ({ name, price, quantity, status }: Props) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-32 p-4">
        <img src={img} alt="Apple Watch" />
      </td>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          {status === 'In Progress...' ? <RedStatusDot /> : <GreenStatusDot />} {status}
        </div>
      </td>
      <td className="px-6 py-4">{quantity}</td>
      <td className="px-6 py-4">${price}</td>
    </tr>
  )
}
