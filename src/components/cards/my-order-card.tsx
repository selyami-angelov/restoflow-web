import { Badge, Button, Label } from 'flowbite-react'
import { Order } from '../../pages/models'
import { RiDeleteBinLine } from 'react-icons/ri'
import { usePut } from '../../hooks/use-put'
import { useDelete } from '../../hooks/use-delete'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { convertUtcToLocalString } from '../../utils/utc-tolocale'
import { useEffect } from 'react'

interface Props extends Order {
  getMyOrders: () => void
}

export const MyOrderCard = ({
  createdDate,
  productQuantity,
  product,
  id,
  isReady,
  tableNumber,
  getMyOrders,
}: Props) => {
  const { putData, loading, data } = usePut({ manual: true })
  const { deleteData } = useDelete({ manual: true })
  const handleServeClick = () => {
    const endpoint = `/orders/served/${id}`
    putData({ url: endpoint })
  }

  const handleDeleteClick = () => {
    deleteData({ url: `${API_ENDPOINTS.ORDERS}/${id}` })
  }

  useEffect(() => {
    if (data) {
      getMyOrders()
    }
  }, [data])

  return (
    <div className="max-w-sm relative pb-20 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <img className="rounded-t-lg w-full h-full object-cover" src={product?.img} alt="" />
        </div>
      </a>
      <div style={{ height: 'calc(100% - 200px)' }} className="flex flex-col justify-between">
        <div className="m-5 mb-0">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product?.name}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product?.description}</p>
        </div>
        <div className="flex justify-between items-start mt-5 p-3 m-1 bg-gray-100 dark:bg-gray-700">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Label>Quantity:</Label>
              <p className="text-gray-700 dark:text-gray-400">{productQuantity}</p>
            </div>
            <div className="flex items-center gap-1">
              <Label>Created:</Label>
              <p className="text-gray-700 dark:text-gray-400">{convertUtcToLocalString(createdDate)}</p>
            </div>
            <div className="flex items-center gap-1">
              <Label>Table:</Label>
              <p className="text-gray-700 dark:text-gray-400">{tableNumber}</p>
            </div>
          </div>
          <Badge size={'sm'} color={isReady ? 'success' : 'yellow'}>
            {isReady ? 'Ready' : 'In Progress..'}
          </Badge>
        </div>
      </div>

      <div className="absolute bottom-0 right-2 left-2 p-4">
        <div className="flex w-full justify-end gap-2 border-t mt-3">
          <Button
            isProcessing={loading}
            processingSpinner={
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline  h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            }
            disabled={!isReady}
            onClick={handleServeClick}
            className="mt-3"
            color={'success'}
            size={'xs'}
          >
            Mark as Served
          </Button>
          <Button onClick={handleDeleteClick} className="mt-3 flex gap-2" color={'failure'} size={'xs'}>
            <RiDeleteBinLine className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
