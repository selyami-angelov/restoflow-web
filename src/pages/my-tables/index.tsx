import { ChangeEventHandler, useEffect, useState } from 'react'
import { Card } from 'flowbite-react'
import { useGet } from '../../hooks/use-get'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { Bill, Order, Product, Table } from '../models'
import { TableRow } from '../../components/table/table-row'
import { OrdersInProgressWarning } from '../../components/modals/orders-inprogress-warning'

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
  const { data: tables } = useGet<Table[]>({ url: API_ENDPOINTS.MY_TABLES })
  const { data: products, getData: getProducts } = useGet<Product[]>({ manual: true })
  const { data: userOrders, getData: getOrders } = useGet<Order[]>({ manual: true })
  const { getData: createBill } = useGet<Bill>({ manual: true })

  console.log('user orders', userOrders)
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
