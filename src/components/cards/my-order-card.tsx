import { Badge, Button, Label } from 'flowbite-react'
import img from '../../assets/burger.jpg'
import { Order, Product } from '../../pages/models'
import { RiDeleteBinLine } from 'react-icons/ri'
import { usePut } from '../../hooks/use-put'
import { useDelete } from '../../hooks/use-delete'
import { API_ENDPOINTS } from '../../common/api-endpoints'

interface Props extends Order {
  product?: Product
}

export const MyOrderCard = ({ createdDate, productQuantity, product, id, isReady }: Props) => {
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
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={img} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product?.name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product?.description}</p>
        <div className="flex justify-between items-start mt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Label>Quantity:</Label>
              <p>{productQuantity}</p>
            </div>
            <div className="flex items-center gap-1">
              <Label>Created:</Label>
              <p>{new Date(createdDate).toLocaleTimeString()}</p>
            </div>
            <div className="flex items-center gap-1">
              <Label>Table:</Label>
              <p>{}</p>
            </div>
          </div>
          <Badge size={'sm'} color={isReady ? 'success' : 'gray'}>
            {isReady ? 'Ready' : 'In Progress..'}
          </Badge>
        </div>
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
