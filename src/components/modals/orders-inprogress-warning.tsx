import { Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

interface Props {
  show: boolean
  ordersCount?: number
  tableNumber?: number
  close: () => void
}

export const OrdersInProgressWarning = ({ show, close, ordersCount, tableNumber }: Props) => {
  return (
    <Modal show={show} size="md" popup onClose={() => close()}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-red-300" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {`There are ${ordersCount} unserved orders for table ${tableNumber}. Please serve all orders before completing the table.`}
          </h3>
        </div>
      </Modal.Body>
    </Modal>
  )
}
