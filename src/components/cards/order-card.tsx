import { Button, Modal } from 'flowbite-react'
import img from '../../assets/burger.jpg'
import { Order, Product } from '../../pages/models'
import { HiCheck, HiOutlineExclamationCircle } from 'react-icons/hi'
import { usePut } from '../../hooks/use-put'
import { useState } from 'react'

interface Props extends Order {
  product?: Product
}

export const OrderCard = ({
  createdBy,
  createdDate,
  productQuantity,
  editedBy,
  editedDate,
  product,
  id,
  info,
}: Props) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const { putData } = usePut({ manual: true })

  const handleDoneClick = () => {
    const endpoint = `/orders/ready/${id}`
    putData({ url: endpoint })
  }

  return (
    <div className="flex justify-center w-full p-1">
      <a className="flex flex-col items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row w-2/3 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col items-start md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={img}
            alt="burger-img"
          />
          <div className="flex flex-col pl-3 justify-between leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product?.name}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product?.description}</p>
          </div>
        </div>
        <div className="flex h-full flex-col justify-between items-end">
          <div>
            <div className="flex gap-1 text-lg font-bold dark:text-white">
              <label>Quantity:</label>
              <p>{productQuantity}</p>
            </div>
            <div className="flex gap-1">
              <label>Created by:</label>
              <p>{createdBy}</p>
            </div>
            <div className="flex gap-1">
              <label>Created date:</label>
              <p>{new Date(createdDate).toLocaleTimeString()}</p>
            </div>
            {editedBy && (
              <div className="flex gap-1">
                <label>Edited by:</label>
                <p>{editedBy}</p>
              </div>
            )}
            {editedDate && (
              <div className="flex gap-1">
                <label>Edited date:</label>
                <p>{new Date(editedDate).toLocaleTimeString()}</p>
              </div>
            )}
          </div>
          <div className="flex justify-end w-full border-t pt-3 gap-1">
            {info && (
              <button
                onClick={() => setIsInfoOpen(true)}
                type="button"
                className="text-white bg-gradient-to-r flex justify-center items-center gap-1 animate-bounce from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3  text-center"
              >
                <HiOutlineExclamationCircle className="h-5 w-5" />
                Info
              </button>
            )}
            <Button color={'success'} size={'xs'} onClick={handleDoneClick}>
              <HiCheck />
              <p className="ml-1">Done</p>
            </Button>
          </div>
        </div>
      </a>
      <Modal show={isInfoOpen} size="md" popup onClose={() => setIsInfoOpen(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{info}</h3>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
