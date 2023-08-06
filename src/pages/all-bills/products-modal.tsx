import { Modal } from 'flowbite-react'
import { Order } from '../models'
import img from '../../assets/burger.jpg'

interface Props {
  isOpen?: boolean
  closeModal: () => void
  orders?: Partial<Order>[]
}

export const ProdcutsModal = ({ isOpen, closeModal, orders }: Props) => {
  console.log(orders)
  return (
    <>
      <Modal show={isOpen} onClose={closeModal} size={'4xl'}>
        <Modal.Header>Bill products</Modal.Header>
        <Modal.Body>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-32 p-4">
                      <img src={order?.product?.img} alt="Product img" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{order.product?.name}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {order.createdDate && new Date(order.createdDate).toLocaleString('en-GB')}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{order.productQuantity}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${(Number(order.productQuantity) * Number(order.product?.price)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
