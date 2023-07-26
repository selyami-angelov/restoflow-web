import { Badge, Button, Label } from 'flowbite-react'
import { Order } from '../../pages/models'
import { RiDeleteBinLine } from 'react-icons/ri'
import { usePut } from '../../hooks/use-put'
import { useDelete } from '../../hooks/use-delete'
import { API_ENDPOINTS } from '../../common/api-endpoints'

export const MyOrderCard = ({ createdDate, productQuantity, product, id, isReady, tableNumber }: Order) => {
  const { putData } = usePut({ manual: true })
  const { data: deleteResponse, deleteData } = useDelete({ manual: true })
  const handleServeClick = () => {
    const endpoint = `/orders/served/${id}`
    putData({ url: endpoint })
  }

  const handleDeleteClick = () => {
    deleteData({ url: `${API_ENDPOINTS.ORDERS}/${id}` })
  }

  console.log('order id', id)
  console.log('delete response', deleteResponse)

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
              <p className="text-gray-700 dark:text-gray-400">{new Date(createdDate).toLocaleTimeString()}</p>
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
          <Button onClick={handleServeClick} className="mt-3" color={'success'} size={'xs'}>
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
