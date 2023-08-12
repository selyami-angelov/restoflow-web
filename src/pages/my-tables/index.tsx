import { ChangeEventHandler, useEffect, useState } from 'react'
import { Button, Card } from 'flowbite-react'
import { useGet } from '../../hooks/use-get'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { Bill, Order, Product, Table } from '../models'
import { TableRow } from '../../components/table/table-row'
import { OrdersInProgressWarning } from '../../components/modals/orders-inprogress-warning'
import { HiCheck } from 'react-icons/hi'

interface TableRowDataProps {
  orderId: number
  productName: string
  orderStatus?: 'Served' | 'In Progress...'
  productQuantity: number
  orderPrice: string
  productImg?: string
}

export const MyTables = () => {
  const [selectedTable, setSelectedTable] = useState<Table>()
  const [tableRowData, setTableRowData] = useState<TableRowDataProps[]>()
  const [showInprogrWarning, setShowInprogrWarning] = useState(false)
  const { data: tables, getData: getTables } = useGet<Table[]>({ manual: true })
  const { data: products, getData: getProducts } = useGet<Product[]>({ manual: true })
  const { data: userOrders, getData: getOrders } = useGet<Order[]>({ manual: true })
  const { data: createBillResponse, getData: createBill, loading } = useGet<Bill>({ manual: true })

  useEffect(() => {
    if (userOrders?.length) {
      const orderProducts = [...new Set(userOrders.map((o) => o.productId))]
      const endpoint = `${API_ENDPOINTS.PRODUCTS}/range?ids=${orderProducts}`
      getProducts(endpoint)
    }
  }, [userOrders])

  useEffect(() => {
    if (tables?.length) {
      const firstTable = tables[0]
      setSelectedTable(firstTable)
      getTableOrders(firstTable.id.toString())
    }
  }, [tables])

  useEffect(() => {
    getTables(API_ENDPOINTS.MY_TABLES)
    setTableRowData([])
  }, [createBillResponse])

  useEffect(() => {
    if (products?.length && userOrders?.length) {
      const data: TableRowDataProps[] = []

      userOrders.forEach((order) => {
        const product = products.find((p) => p.id === order.productId)
        if (product) {
          const rowData: TableRowDataProps = {
            orderId: order.id,
            productName: product?.name,
            orderStatus: order.isServed ? 'Served' : 'In Progress...',
            orderPrice: (order.productQuantity * Number(product.price)).toFixed(2),
            productQuantity: order.productQuantity,
            productImg: product.img,
          }
          data.push(rowData)
        }
      })

      setTableRowData(data)
    }
  }, [products, userOrders])

  const handleTableSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const tableId = event.target.selectedOptions[0].id
    const table = tables?.find((t) => t.id === Number(tableId))
    setSelectedTable(table)
    getTableOrders(tableId)
  }

  const getTableOrders = (tableId: string) => {
    const url = `${API_ENDPOINTS.ORDERS}/tables/${tableId}`
    getOrders(url)
  }

  const handleComplete = () => {
    if (tableRowData?.some((r) => r.orderStatus !== 'Served')) {
      setShowInprogrWarning(true)
      return
    }
    createBill(`${API_ENDPOINTS.CREATE_BILL}/${selectedTable?.id}`)
  }

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
                value={selectedTable?.tableNumber}
                onChange={handleTableSelect}
                className="block w-full p-2 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {tables?.map((table) => (
                  <option key={table.id} id={table.id.toString()}>
                    {table.tableNumber}
                  </option>
                ))}
              </select>
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
            {tableRowData?.map((row) => (
              <TableRow
                key={row.orderId}
                name={row.productName}
                status={row.orderStatus}
                quantity={row.productQuantity}
                price={row.orderPrice}
                img={row?.productImg ?? ''}
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
              <td className="px-6 py-3">
                {tableRowData
                  ?.map((d) => d.productQuantity)
                  .reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
              </td>
              <td className="px-6 py-3">
                $
                {tableRowData
                  ?.map((d) => Number(d.orderPrice))
                  .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <OrdersInProgressWarning
        show={showInprogrWarning}
        close={() => setShowInprogrWarning(false)}
        tableNumber={selectedTable?.tableNumber}
        ordersCount={tableRowData?.filter((t) => t.orderStatus !== 'Served').length}
      />
    </Card>
  )
}
