import { Button, Card } from 'flowbite-react'
import { Bill, OccupiedTables } from '../models'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { useGet } from '../../hooks/use-get'
import { TableRow } from '../../components/table/table-row'
import { OrdersInProgressWarning } from '../../components/modals/orders-inprogress-warning'
import { HiCheck } from 'react-icons/hi'

export const AllTables = () => {
  const [selectedTable, setSelectedTable] = useState<OccupiedTables>()
  const [showInprogrWarning, setShowInprogrWarning] = useState(false)
  const { data: occupiedTables } = useGet<OccupiedTables[]>({ url: API_ENDPOINTS.OCCUPIED_TABLES })
  const { getData: createBill, loading } = useGet<Bill>({ manual: true })

  const handleTableSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const tableNumber = event.target.value
    const table = occupiedTables?.find((ot) => ot.table.tableNumber === +tableNumber)
    setSelectedTable(table)
  }

  const handleComplete = () => {
    if (selectedTable?.orders.some((order) => !order.isServed)) {
      setShowInprogrWarning(true)
      return
    }

    createBill(`${API_ENDPOINTS.CREATE_BILL}/${selectedTable?.table.id}`)
  }

  useEffect(() => {
    if (occupiedTables) {
      setSelectedTable(occupiedTables[0])
    }
  }, [occupiedTables])

  console.log(occupiedTables)

  return (
    <Card className="h-full flex flex-col w-full rounded-none">
      <div className="relative overflow-x-auto h-full shadow-md sm:rounded-lg">
        <div className="flex items-end justify-between p-4 bg-white dark:bg-gray-900 border-b">
          <div className="flex gap-2 items-end">
            <div>
              <label htmlFor="select" className="block mb-2 ml-1 text-xs font-medium text-gray-900 dark:text-white">
                Select Table
              </label>
              <select
                id="select"
                value={selectedTable?.table.tableNumber}
                onChange={handleTableSelect}
                className="block w-full p-2 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {occupiedTables?.map((ot) => (
                  <option key={ot.table.id} id={ot.table.id.toString()}>
                    {ot.table.tableNumber}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                onChange={() => console.log('search')}
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 sm:text-xs text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
              {/* <!-- Dropdown menu --> */}
            </div>
          </div>
          <Button
            isProcessing={loading}
            color={'success'}
            size={'xs'}
            onClick={handleComplete}
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
          >
            <HiCheck />
            <p className="ml-1">Complete</p>
          </Button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedTable &&
              selectedTable.orders.map((order) => (
                <TableRow
                  key={order.id}
                  name={order.product?.name ?? ''}
                  status={order.isServed ? 'Served' : 'In Progress...'}
                  quantity={order.productQuantity}
                  price={(order.productQuantity * Number(order.product?.price)).toFixed(2)}
                  img={order.product?.img ?? ''}
                  userEmail={selectedTable.user.email}
                />
              ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
              <th scope="row" className="px-6 py-3 text-base">
                Total
              </th>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">
                {selectedTable?.orders
                  ?.map((o) => o.productQuantity)
                  .reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
              </td>
              <td className="px-6 py-3">
                $
                {selectedTable &&
                  selectedTable?.orders
                    ?.map((o) => (o.productQuantity * Number(o.product?.price)).toFixed(2))
                    .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0)
                    .toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <OrdersInProgressWarning
        show={showInprogrWarning}
        close={() => setShowInprogrWarning(false)}
        tableNumber={selectedTable?.table.tableNumber}
        ordersCount={selectedTable?.orders.filter((o) => !o.isServed).length}
      />
    </Card>
  )
}
