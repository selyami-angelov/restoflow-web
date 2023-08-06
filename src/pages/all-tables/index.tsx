import { Card } from 'flowbite-react'
import { Bill, OccupiedTables } from '../models'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { useGet } from '../../hooks/use-get'
import { TableRow } from '../../components/table/table-row'
import { OrdersInProgressWarning } from '../../components/modals/orders-inprogress-warning'

export const AllTables = () => {
  const [selectedTable, setSelectedTable] = useState<OccupiedTables>()
  const [showInprogrWarning, setShowInprogrWarning] = useState(false)
  const { data: occupiedTables } = useGet<OccupiedTables[]>({ url: API_ENDPOINTS.OCCUPIED_TABLES })
  const { getData: createBill } = useGet<Bill>({ manual: true })

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
          <button
            type="button"
            onClick={handleComplete}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Complete
          </button>
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
